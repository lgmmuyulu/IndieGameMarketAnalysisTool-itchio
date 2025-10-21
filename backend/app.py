# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import werkzeug.utils

# 导入您编写的分析器类
from review_analyzer import GameReviewAnalyzer

# 初始化Flask应用
app = Flask(__name__)
CORS(app) # 允许跨域请求，以便React前端可以访问

# 配置上传和输出文件夹
UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'output'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER

# 确保文件夹存在
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(os.path.join(OUTPUT_FOLDER, 'charts'), exist_ok=True)

@app.route('/analyze', methods=['POST'])
def analyze_reviews():
    """
    接收前端上传的CSV文件，执行分析，并返回结果文件的路径。
    """
    # 1. 检查是否有文件上传
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # 2. 保存上传的文件
    filename = werkzeug.utils.secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    # 3. 调用您的分析脚本
    try:
        # 初始化分析器
        analyzer = GameReviewAnalyzer(game_name="上传的游戏")
        analyzer = analyzer.load_data(filepath)

        if analyzer:
            # 执行分析
            analyzer.run_full_analysis()
            
            # 定义输出路径
            chart_dir = os.path.join(app.config['OUTPUT_FOLDER'], 'charts')
            report_path = os.path.join(app.config['OUTPUT_FOLDER'], 'analysis_report.docx')
            
            # 生成图表和报告
            analyzer.visualize(output_dir=chart_dir + '/')
            analyzer.generate_word_report(output_path=report_path)

            # 4. 构建返回给前端的JSON响应
            result = {
                "message": "Analysis successful!",
                "report_url": f"/static/{os.path.basename(report_path)}",
                "radar_chart_url": f"/static/charts/radar_chart.png",
                "sentiment_pie_url": f"/static/charts/sentiment_pie.png"
            }
            return jsonify(result), 200
        else:
            return jsonify({"error": "Failed to initialize analyzer."}), 500

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/static/<path:filename>')
def serve_static(filename):
    """
    提供一个URL来让前端可以访问和下载生成的报告和图表。
    """
    return send_from_directory(app.config['OUTPUT_FOLDER'], filename)

if __name__ == '__main__':
    # 启动服务器
    app.run(debug=True, port=5000)
