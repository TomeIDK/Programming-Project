loadScript("/src/components/toast/toast.js", (script) => {
  console.log(`Script ${script.src} loaded.`);
  showToast("This is a failed test", false);
});

function loadScript(src, cb) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => cb(script);
  document.head.append(script);
}
