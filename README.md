<img width="2520" height="2972" alt="Review" src="https://github.com/user-attachments/assets/78e5fbc5-7e37-4593-93b7-79f1ec7efc01" /># IndieGameMarketAnalysisTool-itchio
A Python tool for analyzing indie game reviews, automating sentiment analysis and dimensional evaluation to generate insightful market reports.
独立游戏数据分析系统 | Indie Game Data Analysis System

一个结合了 Python 后端分析能力与 React 前端可视化的全栈Web应用，用于自动化分析独立游戏的用户评论数据，并生成图文并茂的市场竞争力分析报告。

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
