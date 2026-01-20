(() => {
  const fileInput            = document.getElementById("fileInput");
  const dropzone             = document.getElementById("dropzone");
  const fileStatus           = document.getElementById("fileStatus");
  const dzPreview            = document.getElementById("dzPreview");
  const loadingPreview       = document.getElementById("loadingPreview");
  const loadingPreviewWrap   = document.querySelector(".loading-preview-wrapper");
  const loadingPlaceholder   = document.getElementById("loadingPreviewPlaceholder");
  const loadingFileName      = document.getElementById("loadingFileName");
  const fileTabButton        = document.querySelector('.tabs label[for="t1"]');
  const defaultFileLabel     = "파일을 선택해 주세요";

  if (!fileInput || !dropzone || !fileStatus || !dzPreview) return;

  const reset = () => {
    fileInput.value = "";
    fileStatus.textContent = "선택된 파일 없음";
    fileStatus.style.display = "none";
    dzPreview.hidden = true;
    dzPreview.src = "";
    dropzone.classList.remove("has-image");
    if (loadingPreview) {
      loadingPreview.hidden = true;
      loadingPreview.src = "";
    }
    if (loadingPlaceholder) {
      loadingPlaceholder.hidden = false;
      loadingPlaceholder.style.display = "";
    }
    if (loadingFileName) {
      loadingFileName.textContent = defaultFileLabel;
    }
    if (loadingPreviewWrap) {
      loadingPreviewWrap.classList.remove("has-image");
    }
  };

  const showImage = (file) => {
    if (!file) { reset(); return; }

    // 이미지 파일만
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      reset();
      return;
    }

    // 이전 src 정리
    dzPreview.hidden = true;
    dzPreview.src = "";
    if (loadingPreview) {
      loadingPreview.hidden = true;
      loadingPreview.src = "";
    }
    if (loadingPlaceholder) {
      loadingPlaceholder.hidden = false;
      loadingPlaceholder.style.display = "";
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (!result) return;

      dzPreview.src = result;
      dzPreview.hidden = false;
      dropzone.classList.add("has-image");

      if (loadingPreview) {
        loadingPreview.src = result;
        loadingPreview.hidden = false;
      }
      if (loadingPlaceholder) {
        loadingPlaceholder.hidden = true;
        loadingPlaceholder.style.display = "none";
      }
      if (loadingPreviewWrap) {
        loadingPreviewWrap.classList.add("has-image");
      }
      fileStatus.textContent = file.name;
      fileStatus.style.display = "inline-block";
      if (loadingFileName) {
        loadingFileName.textContent = file.name;
      }
    };
    reader.readAsDataURL(file);
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

  if (fileTabButton) {
    fileTabButton.addEventListener("click", () => {
      setTimeout(openPicker, 0);
    });
    fileTabButton.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        setTimeout(openPicker, 0);
      }
    });
  }

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
