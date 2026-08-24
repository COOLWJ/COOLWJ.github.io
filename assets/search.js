(() => {
  const input = document.querySelector("#search-input"), output = document.querySelector("#search-results"), count = document.querySelector("#search-count");
  const posts = JSON.parse(document.querySelector("#search-data").textContent);
  const esc = value => String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  input.addEventListener("input", () => { const query = input.value.trim().toLowerCase(); if (!query) { output.innerHTML = ""; count.textContent = "请输入关键词开始搜索"; return; } const results = posts.filter(post => [post.title, post.category, (post.tags || []).join(" "), post.content].join(" ").toLowerCase().includes(query)); count.textContent = `找到 ${results.length} 篇相关文章`; output.innerHTML = results.map(post => `<article><p>${esc(post.date)} · ${esc(post.category || "未分类")}</p><h2><a href="${post.url}">${esc(post.title)}</a></h2><span>${esc((post.tags || []).map(tag => `# ${tag}`).join("  "))}</span></article>`).join("") || '<div class="empty-state">没有找到相关文章，试试更短的关键词。</div>'; });
})();
