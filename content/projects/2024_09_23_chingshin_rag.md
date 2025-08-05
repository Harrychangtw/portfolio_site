---
title: "Chingshin RAGi"
category: "Full Stack Dev"
subcategory: "School Project"
description: "Custom RAG-based chatbot built with Svelte, PyTorch, and FastAPI without relying on all-in-one frameworks like LangChain"
imageUrl: "images/optimized/projects/2024_09_23_chingshing_ragi/titlecard.webp"
year: "2024"
date: "2024-09-23"
role: "Designer & Developer"
technologies: ["Svelte", "PyTorch", "FastAPI"]
pinned: 6
featured: true
---

## Project Overview

This project began when we noticed significant inefficiencies in how resources were allocated within our school management system. Being a private institution, Chingshin High School wasn’t widely known, and this lack of visibility was worsened by navigation complexity of the school website.

To address this, we set out to build a custom Retrieval-Augmented Generation (RAG) system — without using any all-in-one frameworks like Langchain — as part of one of our first large-scale development efforts. With initial guidance from Andrew Kuo, I later took primary responsibility for backend development and significantly improved the user interface.

This project won **First Prize** at the [**GenAI Star Competition**](https://genaistars.org.tw/news/35), hosted by the **National Science and Technology Council**.

---

## Detailed Implementation

### Database

The database forms the foundation of the RAG system, storing both embedding indices and the full content of each data entry.

- Instead of using vector databases like Pinecone or ChromaDB, we opted for **SQLite**, storing vector embeddings in **JSON format** for added flexibility.
- Initially, we tried unifying embedding and generation by extracting the last hidden layer from **TAIDE-7B** via PyTorch. However, the performance and accuracy were lacking.
- We later adopted a dedicated embedding model, **bge-small-zh-v1.5**, which significantly improved both speed and precision.
- Content was scraped from the school website using **BeautifulSoup (BS4)**, chunked into paragraphs, and programmatically added to the database.

### Search Engine

We implemented a **hybrid search engine** combining both lexical and semantic search:

- **Lexical search** offers faster lookups and excels with keyword-specific queries.
- **Semantic search** leverages vector embeddings for understanding natural language queries.
- Performance was further optimized using **HNSWlib** and **multi-threading**, greatly reducing search latency.

### API Module

- Built with **FastAPI**, chosen for its performance and **WebSocket support**.
- Initially used **Gemini API** due to cost-performance benefits.
- Later migrated to **OpenAI’s API** after noticing better startup speeds.
- Post-migration, we enabled **streaming responses** to improve the user experience.

### Frontend

- Built using **Svelte**, selected for its development speed and lightweight performance — ideal for smaller-scale apps.
- The UI featured a clean **chat interface** with a **dropdown menu** for user interaction.

---

