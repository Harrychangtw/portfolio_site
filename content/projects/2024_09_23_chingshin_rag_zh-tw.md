---
title: "靜心 RAGi"
category: "全端開發"
subcategory: "校園專案"
description: "一個基於 RAG 的客製化聊天機器人，使用 Svelte、PyTorch 與 FastAPI 打造，且未使用 LangChain 等一體式框架。"
imageUrl: "images/optimized/projects/2024_09_23_chingshing_ragi/titlecard.webp"
year: "2024"
date: "2024-09-23"
role: "設計師與開發者"
technologies: ["Svelte", "PyTorch", "FastAPI"]
pinned: 6
featured: true
---

## 專案總覽

這個專案的起點，是我們發現在校務系統中，資源分配的效率有顯著的不足。靜心高中作為一所私立學校，知名度相對不高，而學校網站複雜的導覽設計，更讓這個問題雪上加霜。

為了解決這個問題，我們著手打造一個客製化的 Retrieval-Augmented Generation (RAG) 系統——且未使用 LangChain 等任何一體式框架——作為我們早期的大型開發專案之一。在 Andrew Kuo 的初期指導下，我後來主要負責後端開發，並大幅改善了使用者介面。

此專案榮獲由**國家科學及技術委員會**主辦的 [**GenAI Star 競賽**](https://genaistars.org.tw/news/35)的**特優**。

---

## 實作細節

### 資料庫

資料庫是 RAG 系統的基石，同時儲存了向量嵌入的索引與每筆資料的完整內容。

- 我們沒有選擇像 Pinecone 或 ChromaDB 這類的向量資料庫，而是採用 **SQLite**，並將向量嵌入以 **JSON 格式**儲存，以增加彈性。
- 起初，我們試圖透過 PyTorch 從 **TAIDE-7B** 模型中提取最後一個隱藏層，來統一 embedding 和生成任務。然而，其效能和準確性皆不理想。
- 後來，我們改用專門的 embedding 模型 **bge-small-zh-v1.5**，這大幅提升了速度與精準度。
- 我們使用 **BeautifulSoup (BS4)** 爬取學校網站的內容，將其切分為段落，並透過程式自動化地加入資料庫。

### 搜尋引擎

我們實作了一個結合了「字詞搜尋」與「語意搜尋」的**混合式搜尋引擎**：

- **字詞搜尋 (Lexical search)**：提供更快的查詢速度，且在處理關鍵字查詢時表現優異。
- **語意搜尋 (Semantic search)**：利用向量嵌入來理解自然語言查詢。
- 我們進一步使用 **HNSWlib** 與 **multi-threading** 技術來優化效能，大幅降低了搜尋延遲。

### API 模組

- 使用 **FastAPI** 打造，選擇它的原因是其高效能與對 **WebSocket** 的支援。
- 初期因成本效益考量，我們使用 **Gemini API**。
- 後來，在注意到其啟動速度更快後，我們遷移至 **OpenAI 的 API**。
- 遷移後，我們啟用了 **streaming responses**，以改善使用者體驗。

### 前端

- 前端使用 **Svelte** 打造，因為它開發速度快且輕量高效——非常適合小型應用程式。
- UI 設計為一個簡潔的**聊天介面**，並搭配一個**下拉式選單**供使用者互動。

---