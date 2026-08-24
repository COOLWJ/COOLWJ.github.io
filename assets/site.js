(() => {
  const content = document.querySelector("#article-content");
  const toc = document.querySelector("#toc-list");
  if (content && toc) {
    const headings = [...content.querySelectorAll("h2, h3")];
    toc.innerHTML = "";
    headings.forEach((heading, index) => {
      if (!heading.id) heading.id = `section-${index + 1}`;
      const item = document.createElement("li");
      if (heading.tagName === "H3") item.className = "toc-sub";
      const link = document.createElement("a"); link.href = `#${heading.id}`; link.textContent = heading.textContent;
      item.appendChild(link); toc.appendChild(item);
    });
    if (!headings.length) toc.innerHTML = '<li class="toc-empty">本文暂无分节</li>';
  }
  const progress = document.querySelector(".reading-progress span");
  if (progress) window.addEventListener("scroll", () => { const max = document.documentElement.scrollHeight - innerHeight; progress.style.width = `${max > 0 ? Math.min(100, scrollY / max * 100) : 0}%`; }, { passive: true });
  document.querySelectorAll(".content pre").forEach(pre => { const button = document.createElement("button"); button.className = "copy-code"; button.type = "button"; button.textContent = "复制"; button.addEventListener("click", async () => { await navigator.clipboard.writeText(pre.innerText); button.textContent = "已复制"; setTimeout(() => button.textContent = "复制", 1200); }); pre.appendChild(button); });
})();
