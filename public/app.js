* {
  box-sizing: border-box;
}

:root {
  --bg: #f4f7fb;
  --panel: #ffffff;
  --panel-alt: #eef4ff;
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --text: #132238;
  --muted: #637089;
  --border: #dfe7f3;
  --success: #17a673;
  --warning: #f59e0b;
  --danger: #dc2626;
  --shadow: 0 16px 32px rgba(15, 23, 42, 0.06);
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: linear-gradient(180deg, #eef6ff 0%, var(--bg) 100%);
  color: var(--text);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 48px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 8px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 11px;
  color: var(--muted);
}

h1, h2, p {
  margin-top: 0;
}

h1 {
  margin-bottom: 0;
  font-size: clamp(2rem, 4vw, 3rem);
}

.primary-btn,
.secondary-btn,
.icon-btn {
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.primary-btn {
  background: var(--primary);
  color: white;
  padding: 12px 18px;
  font-weight: 700;
}

.primary-btn:hover {
  background: var(--primary-dark);
}

.secondary-btn {
  background: #edf2ff;
  color: var(--text);
  padding: 11px 18px;
  font-weight: 600;
}

.icon-btn {
  background: transparent;
  color: var(--muted);
  font-size: 0.9rem;
  padding: 8px 10px;
}

.icon-btn:hover {
  background: #eef2ff;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(160px, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

.stat-card,
.panel {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: var(--shadow);
}

.stat-card {
  padding: 18px 20px;
}

.stat-card span {
  display: block;
  color: var(--muted);
  font-size: 0.82rem;
  margin-bottom: 8px;
}

.stat-card strong {
  font-size: clamp(1.6rem, 2vw, 2.1rem);
}

.toolbar {
  margin-bottom: 24px;
}

.search-box {
  display: block;
}

.search-box input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: 12px;
  font-size: 1rem;
  background: var(--panel);
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(300px, 360px) minmax(0, 1fr);
  gap: 24px;
}

.panel {
  padding: 20px;
}

.form-panel h2,
.list-header h2 {
  margin-bottom: 18px;
}

form {
  display: grid;
  gap: 16px;
}

label {
  display: grid;
  gap: 8px;
  font-size: 0.96rem;
  color: var(--text);
  font-weight: 600;
}

input,
textarea {
  width: 100%;
  padding: 11px 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #fbfdff;
  color: var(--text);
  font: inherit;
}

input:focus,
textarea:focus {
  outline: 2px solid rgba(37, 99, 235, 0.14);
  border-color: rgba(37, 99, 235, 0.4);
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 14px 10px;
  border-bottom: 1px solid var(--border);
  text-align: left;
  vertical-align: top;
}

th {
  color: var(--muted);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

tbody tr:hover {
  background: rgba(37, 99, 235, 0.02);
}

.actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.empty-state {
  padding: 28px 12px;
  text-align: center;
  color: var(--muted);
  border: 1px dashed var(--border);
  border-radius: 12px;
  background: #fafcff;
}

.hidden {
  display: none;
}

@media (max-width: 900px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .stats {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }
}
