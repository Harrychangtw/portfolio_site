---
title: "個人網站"
category: "網站開發"
subcategory: "個人專案"
description: "一個使用 Next.js 打造的現代化個人作品集網站，並搭配基於 Markdown 的內容管理系統，讓內容更新更方邊。"
imageUrl: "images/optimized/projects/2025_04_12_portfolio_design/titlecard.webp"
year: "2025"
date: "2025-04-12"
role: "設計師與開發者"
technologies: ["Next.js", "React", "TypeScript", "TailwindCSS"]
pinned: 5
featured: true
---

## 專案總覽

本作品集網站採用 Next.js 進行靜態生成（Static Site Generation），旨在提供快速且專注於內容的瀏覽體驗。其核心架構採用自訂的 Markdown 內容管理系統，在建置階段（build time）解析 `.md` 檔案以生成靜態頁面。此方法無需傳統資料庫，從而實現了高效能且易於維護的網站。

前端以 React 和 TypeScript 為基礎，確保了程式碼的強健性與型別安全。UI 部分則採用 TailwindCSS 進行快速的 utility-first 開發，並參考 Joseph Zhang 的作品集，設計了三欄式的響應式佈局。

---

## 程式碼架構

整體程式碼依循功能劃分，主要目錄如下：

-   **`app/`**：包含 Next.js 的路由與頁面元件。每個頁面均為伺服器元件，負責從 Markdown 檔案中獲取資料。
-   **`lib/`**：存放 Markdown 處理的核心邏輯（`lib/markdown.ts`），負責檔案讀取、frontmatter 解析與 HTML 轉換。
-   **`content/`**：作為一個 headless CMS，儲存所有專案與攝影集所需的 Markdown 檔案。
-   **`components/`**：存放可重複使用的 React 元件，包括 UI 元素、佈局元件及客戶端互動元件。
-   **`public/`**：存放所有靜態資源，如圖片與其他媒體檔案。

此架構將內容與呈現分離，便於後續的更新與維護。

---

## 核心技術特色

### Markdown 驅動的內容系統

網站內容完全由 Markdown 檔案管理。`lib/markdown.ts` 模組透過以下工具庫處理內容：

-   **`gray-matter`**：解析每個 Markdown 檔案中的 YAML frontmatter，為專案與攝影作品提供元數據（metadata）。
-   **`remark` 與 `remark-html`**：將 Markdown 內容轉換為 HTML，再由 React 元件進行渲染。
-   **`unist-util-visit`**：走訪 Markdown 的抽象語法樹（AST），以實現自訂的轉換功能，例如媒體嵌入。

### 動態媒體嵌入

為處理不同類型的媒體，我開發了一個自訂的 Remark 插件 `transformMedia`。此插件會攔截 Markdown AST 中的圖片節點，並根據其 URL 特徵，替換為對應的 HTML 結構：

-   **YouTube 與 Google Drive 影片**：嵌入影片，並提供自訂的預載佔位符與延遲載入功能。
-   **最佳化圖片**：生成帶有 `figure` 元素的圖片，並透過 lazy-loaded `img` 標籤與 shimmer 特效，提供流暢的載入體驗。

### 效能優先的設計

效能是本專案的核心考量之一，為此採用了多項技術以達成高效能指標：

-   **靜態網站生成（SSG）**：所有頁面皆在建置階段預先渲染，大幅縮短了載入時間。
-   **圖片最佳化**：透過自訂腳本，自動將圖片轉換為現代的 WebP 格式、調整尺寸，並生成低品質圖片預覽（LQIP）以實現「模糊淡入」效果。
-   **程式碼分割（Code Splitting）**：Next.js 自動將程式碼拆分為較小的區塊，確保每個頁面僅載入必要的 JavaScript。

### 國際化（i18n）

網站支援英文與繁體中文，內容會根據語系進行過濾，並採用基於檔案的路由系統。中文內容以 `_zh-tw.md` 後綴識別，若特定內容的翻譯版本不存在，則會優雅地降級（graceful fallback）至英文版本。

---

## 工具與技術

-   **Next.js**：運用其靜態網站生成、檔案式路由與高效能等特性。
-   **React**：作為 UI 核心，打造了元件化且互動性高的使用者體驗。
-   **TypeScript**：確保整個應用程式的型別安全，降低執行階段發生錯誤的機率。
-   **TailwindCSS**：一個 utility-first 的 CSS 框架，實現了快速且一致的樣式開發。
-   **`gray-matter` 與 `remark`**：作為 Markdown 內容系統的骨幹，負責處理所有內容的解析與渲染。
-   **Framer Motion**：為網站增添了流暢的動畫與過場效果，提升了整體使用者體驗。
