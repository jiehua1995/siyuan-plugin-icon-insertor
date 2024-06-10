// 插件初始化
siyuan.plugin.add({
    onload: async function() {
      console.log("Auto Favicon Inserter Plugin loaded");
      document.addEventListener('DOMContentLoaded', processLinks);
    },
    onunload: function() {
      console.log("Auto Favicon Inserter Plugin unloaded");
    }
  });
  
  async function fetchFavicon(url) {
    try {
      const response = await fetch(`https://icons.duckduckgo.com/ip2/${new URL(url).hostname}.ico`);
      if (response.ok) {
        return response.url;
      }
    } catch (error) {
      console.error("Error fetching favicon:", error);
    }
    return null;
  }
  
  async function insertFaviconBeforeLink(linkElement) {
    const url = linkElement.href;
    const faviconUrl = await fetchFavicon(url);
    if (faviconUrl) {
      const img = document.createElement('img');
      img.src = faviconUrl;
      img.style.width = '16px';
      img.style.height = '16px';
      img.style.marginRight = '4px';
      linkElement.parentNode.insertBefore(img, linkElement);
    }
  }
  
  async function processLinks() {
    const links = document.querySelectorAll('a');
    for (const link of links) {
      await insertFaviconBeforeLink(link);
    }
  }
  