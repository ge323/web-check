(() => {
  const fileInput    = document.getElementById("fileInput");
  const dropzone     = document.getElementById("dropzone");
  const fileStatus   = document.getElementById("fileStatus");
  const dzPreview    = document.getElementById("dzPreview");

  if (!fileInput || !dropzone || !fileStatus || !dzPreview) return;

  const reset = () => {
    fileInput.value = "";
    fileStatus.textContent = "선택된 파일 없음";
    dzPreview.hidden = true;
    dzPreview.src = "";
    dropzone.classList.remove("has-image");
  };

  const showImage = (file) => {
    if (!file) { reset(); return; }

    fileStatus.textContent = file.name;

    // 이미지 파일만
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      reset();
      return;
    }

    // 이전 src 정리
    dzPreview.hidden = true;
    dzPreview.src = "";

    const url = URL.createObjectURL(file);
    dzPreview.onload = () => URL.revokeObjectURL(url);

    dzPreview.src = url;
    dzPreview.hidden = false;
    dropzone.classList.add("has-image");
  };

  // 드롭존 클릭/키보드 → 파일 선택창
  const openPicker = () => fileInput.click();
  dropzone.addEventListener("click", openPicker);
  dropzone.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openPicker();
    }
  });

  // 파일 선택
  fileInput.addEventListener("change", (e) => {
    showImage(e.target.files && e.target.files[0]);
  });

  // 드래그 기본동작 방지
  ["dragenter", "dragover", "dragleave", "drop"].forEach((evt) => {
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  // 드래그 스타일
  dropzone.addEventListener("dragenter", () => dropzone.classList.add("is-dragover"));
  dropzone.addEventListener("dragover",  () => dropzone.classList.add("is-dragover"));
  dropzone.addEventListener("dragleave", () => dropzone.classList.remove("is-dragover"));

  // 드롭 처리
  dropzone.addEventListener("drop", (e) => {
    dropzone.classList.remove("is-dragover");

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    // input에도 세팅(폼 전송 호환)
    const dt = new DataTransfer();
    dt.items.add(files[0]);
    fileInput.files = dt.files;

    showImage(files[0]);
  });

  // 초기 상태
  reset();
})();
