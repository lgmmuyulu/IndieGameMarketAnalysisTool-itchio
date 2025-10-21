# IndieGameMarketAnalysisTool-itchio
A Python tool for analyzing indie game reviews, automating sentiment analysis and dimensional evaluation to generate insightful market reports.
独立游戏数据分析系统 | Indie Game Data Analysis System

一个结合了 Python 后端分析能力与 React 前端可视化的全栈Web应用，用于自动化分析独立游戏的用户评论数据，并生成图文并茂的市场竞争力分析报告。

项目亮点 

自动化数据分析: 上传简单的CSV文件，即可自动完成对上万条评论的情感分析和六维能力评估。

专家级关键词词典: 内置超大规模、究极版的中英文关键词词典，深度挖掘玩家在核心玩法、叙事逻辑、美术、音效、用户体验、创新性六个维度的真实反馈。

一键生成专业报告: 自动生成包含数据摘要、分析图表和评估结果的 .docx (Word) 格式专业报告，便于商业演示和归档。

现代化交互界面: 基于 React 和 TailwindCSS 构建的动态仪表盘，提供流畅的文件上传体验和清晰的可视化结果展示。

前后端分离架构: 采用经典的 Flask (后端) + React (前端) 架构，展示了全栈开发能力。

动态演示：


(提示: 您可以使用 ScreenToGif 等工具录制一个操作演示GIF，然后上传到这里，这将极大地吸引招聘官的注意)

系统截图

前端交互界面

自动生成的Word报告

[您的前端界面截图]

[您的Word报告内容截图]

六维评估雷达图

情感分布饼图





(提示: 您可以把之前生成的 radar_chart.jpg 和 sentiment_pie.png 上传到这里)

技术栈

后端: Python, Flask, Pandas, Matplotlib, python-docx

前端 (Frontend): React, TailwindCSS, Recharts, Lucide React

开发环境: Visual Studio Code

安装与运行

请确保您的电脑已安装 Python 3.9+ 和 Node.js。

1. 后端设置

# 1. 克隆或下载本仓库
git clone [https://github.com/YourUsername/Your-Repo-Name.git](https://github.com/YourUsername/Your-Repo-Name.git)
cd Your-Repo-Name/backend

# 2. 安装Python依赖库
pip install Flask Flask-Cors pandas numpy matplotlib seaborn python-docx werkzeug

# 3. 启动后端API服务
python app.py

# 👉 服务将运行在 [http://127.0.0.1:5000](http://127.0.0.1:5000)


2. 前端设置 (Frontend Setup)

(假设您已有一个标准的React项目环境)

# 1. 将 frontend 文件夹中的 InteractiveDashboard.jsx 组件放入您的React项目 src 目录
cd path/to/your/react-project

# 2. 安装前端依赖库
npm install recharts lucide-react

# 3. 启动前端开发服务器
npm start

# 👉 应用将运行在 http://localhost:3000


3. 开始使用

在浏览器中打开 http://localhost:3000。

点击“选择文件...”按钮，上传一份包含 review_text 和 rating 两列的CSV文件（仓库中已提供 itchio_reviews.csv作为示例）。

点击“生成分析报告”按钮，等待分析完成。

查看动态生成的结果图表，并下载完整的Word报告。

📁 项目结构 (Project Structure)

/Indie-Game-Analysis-System/
|
|-- backend/
|   |-- app.py                  # Flask 后端API服务器
|   |-- review_analyzer.py      # 核心分析脚本 (究极词典版)
|   |-- itchio_reviews.csv      # 示例评论数据
|   |-- (uploads/)              # (程序自动创建) 用于存放上传的文件
|   `-- (output/)               # (程序自动创建) 用于存放生成的报告和图表
|
|-- frontend/
|   `-- InteractiveDashboard.jsx  # React 前端交互组件
|
`-- README.md                   # 本说明文件
