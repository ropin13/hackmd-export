# HackMD 筆記下載器

## 描述
此命令列工具能將您在 HackMD 上的所有筆記下載到您的本機電腦。每則筆記都會儲存為獨立的 Markdown (`.md`) 檔案。

## 先決條件
- **Node.js:** 建議使用 v18 或更新版本（因 yargs 套件依賴需求）。您可以從 [nodejs.org](https://nodejs.org/) 下載。
- **HackMD API 權杖：** 您需要一組 HackMD API 權杖才能使用此工具。您可以從您的 HackMD 設定頁面中的「API」區域產生 API 權杖。

## 安裝／設定
此工具設計為可直接使用 `npx` 執行，`npx` 已包含在 Node.js (npm v5.2+) 中。不需要額外的安裝步驟。

若要執行此工具，請在您的終端機中使用以下指令，並將 `YOUR_API_TOKEN` 替換為您實際的 HackMD API 權杖：
```bash
npx hackmd-downloader -t YOUR_API_TOKEN
```

### 直接從 GitHub 執行

您也可以直接從其 GitHub 存放庫 `ropin13/hackmd-export` 執行此工具，而無需在本機複製或安裝：

`npx github:ropin13/hackmd-export -t YOUR_API_TOKEN`

請將 `YOUR_API_TOKEN` 替換為您實際的 HackMD API 權杖。`npx` 將會下載並執行此工具。

## 使用方式
使用 `npx` 執行腳本，並透過 `-t` 或 `--token` 選項提供您的 HackMD API 權杖：

```bash
npx hackmd-downloader --token YOUR_API_TOKEN
```
或
```bash
npx hackmd-downloader -t YOUR_API_TOKEN
```

下載的筆記將會儲存在您執行指令的目錄下，一個名為 `exported_notes/` 的資料夾中。

## 專案結構
- `index.js`: 主要的命令列介面 (CLI) 腳本，用於解析參數並協調筆記下載流程。
- `hackmd.js`: 負責與 HackMD API 互動（擷取筆記清單、下載筆記內容）並將筆記儲存至檔案的模組。
- `package.json`: 包含專案元數據、依賴套件（例如用於 HTTP 請求的 `axios` 和用於參數解析的 `yargs`），並定義 `hackmd-downloader` 指令。
- `exported_notes/`: 當您執行腳本時，此目錄會自動建立，所有下載的 HackMD 筆記將會以 Markdown 檔案的形式儲存在此。
- `.gitignore`: 指定 Git 應該忽略的刻意未追蹤檔案（例如 `node_modules/`）。

## 錯誤處理
此腳本包含基本的錯誤處理機制，針對：
- API 請求失敗（例如，無效的權杖、網路問題）。
- 檔案系統操作（例如，建立目錄或寫入檔案時發生問題）。
若發生錯誤，相關訊息將會記錄到主控台。

## 貢獻
歡迎貢獻！如果您發現任何問題或有改進建議，請隨時在專案儲存庫中提出問題或提交拉取請求。

## 授權條款
此專案依據 ISC 授權條款發行（如 `package.json` 中所述）。
