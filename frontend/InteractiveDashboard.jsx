import React, { useState } from 'react';
import { BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Star, MessageSquare, Download, AlertCircle, UploadCloud, Loader2 } from 'lucide-react';

// 这是您设计的“壳子”的静态部分，我们将保留它作为初始状态或示例
const StaticDashboard = () => {
  const dimensionScores = [
    { dimension: '核心玩法', score: 9.2, benchmark: 7.5 }, { dimension: '叙事逻辑', score: 8.8, benchmark: 7.0 },
    { dimension: '美术风格', score: 9.5, benchmark: 7.8 }, { dimension: '音效配乐', score: 9.0, benchmark: 7.2 },
    { dimension: '用户体验', score: 8.5, benchmark: 7.5 }, { dimension: '创新性', score: 8.7, benchmark: 6.8 }
  ];
  const sentimentData = [
    { name: '极度好评', value: 45, color: '#10b981' }, { name: '好评', value: 35, color: '#6ee7b7' },
    { name: '中性', value: 12, color: '#fbbf24' }, { name: '差评', value: 5, color: '#f87171' },
    { name: '极度差评', value: 3, color: '#dc2626' }
  ];
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-gray-500">示例 - 六维评估雷达图</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={dimensionScores}>
            <PolarGrid />
            <PolarAngleAxis dataKey="dimension" />
            <PolarRadiusAxis angle={90} domain={[0, 10]} />
            <Radar name="游戏表现" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            <Radar name="市场基准" dataKey="benchmark" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.3} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-gray-500">示例 - 情感分布</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={sentimentData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
              {sentimentData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


const InteractiveDashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://127.0.0.1:5000";

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("请先选择一个CSV文件。");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || '分析失败，请检查后端服务。');
      }

      const result = await response.json();
      setAnalysisResult(result);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">独立游戏数据分析系统</h1>
          <p className="text-gray-600">上传评论CSV文件, 自动生成图文并茂的竞争力分析报告</p>
        </div>

        {/* 上传与控制区 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">第一步: 上传评论数据</label>
              <div className="flex items-center gap-4">
                <label htmlFor="file-upload" className="cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <UploadCloud size={16} />
                  <span>选择文件...</span>
                </label>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".csv" />
                {selectedFile && <span className="text-sm text-gray-600">{selectedFile.name}</span>}
              </div>
               <p className="text-xs text-gray-500 mt-2">请上传包含 `review_text` 和 `rating` 两列的CSV文件。</p>
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">第二步: 开始分析</label>
              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>分析中...</span>
                  </>
                ) : (
                  '生成分析报告'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 结果展示区 */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-inner min-h-[300px]">
          {error && (
            <div className="text-center text-red-600 bg-red-50 p-4 rounded-md">
              <AlertCircle className="inline-block mr-2" />
              <strong>错误:</strong> {error}
            </div>
          )}
          
          {!isLoading && !analysisResult && !error && (
             <div className="text-center text-gray-500">
               <p className="mb-4">请上传CSV文件并点击 "生成分析报告" 来查看结果。</p>
               <h2 className="text-xl font-bold mb-4">初始界面示例</h2>
               <StaticDashboard />
             </div>
          )}

          {isLoading && (
            <div className="text-center text-gray-600">
              <Loader2 className="animate-spin inline-block h-12 w-12 mb-4" />
              <p>正在全力分析中, 请稍候...</p>
              <p className="text-sm text-gray-500">这可能需要10-30秒</p>
            </div>
          )}

          {analysisResult && (
            <div className="space-y-6">
               <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
                <p className="font-bold">分析成功!</p>
                <p>您的报告和图表已生成完毕。</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">分析报告</h3>
                  <a
                    href={`${API_BASE_URL}${analysisResult.report_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Download size={16} />
                    下载Word报告
                  </a>
                </div>
                <p className="text-gray-600">点击按钮下载完整的、包含图文的 `.docx` 格式市场竞争力分析报告。</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border">
                   <h3 className="text-lg font-semibold mb-4">结果 - 六维评估雷达图</h3>
                   <img src={`${API_BASE_URL}${analysisResult.radar_chart_url}`} alt="六维评估雷达图" className="w-full h-auto" />
                </div>
                <div className="bg-white p-6 rounded-lg border">
                   <h3 className="text-lg font-semibold mb-4">结果 - 情感分布</h3>
                   <img src={`${API_BASE_URL}${analysisResult.sentiment_pie_url}`} alt="情感分布饼图" className="w-full h-auto" />
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default InteractiveDashboard;
