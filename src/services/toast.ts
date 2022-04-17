import "./toast.less";

let containerEl: HTMLElement | null = null;
let containerOptions: ToastContainerOptions | null;

export function configureToastContainer(options: ToastContainerOptions) {
  containerOptions = options;

  if (!containerEl) {
    containerEl = document.createElement("div");
    containerEl.classList.add("base-toast");
    document.body.appendChild(containerEl);
  }

  containerEl.style.top = options.y == "top"
    ? "1rem"
    : "";

  containerEl.style.bottom = options.y == "bottom"
    ? "1rem"
    : "";
}
export function showToast(options: ToastOptions) {
  if (!containerEl) {
    configureToastContainer({
      x: "center",
      y: "bottom"
    });
  }

  const toastEl = document.createElement("div");
  toastEl.classList.add("base-toast__item");

  switch (containerOptions!.x) {
    case "left": {
      toastEl.style.alignSelf = "flex-start";
      break;
    }
    case "right": {
      toastEl.style.alignSelf = "flex-end";
      break;
    }
    default: {
      toastEl.style.alignSelf = "center";
      break;
    }
  }
  
  const icon = getIcon(options);
  
  const iconEl = icon
    ? document.createElement("i")
    : null;
  
  if (iconEl) {
    iconEl.classList.add(...icon?.split(" ")!);
    toastEl.appendChild(iconEl);
  }

  if (options.type) {
    toastEl.classList.add(`base-toast__item--${options.type}`);
  }

  const toastContentEl = document.createElement("div");
  toastContentEl.innerHTML = options.innerHtml;
  toastEl.appendChild(toastContentEl);

  if (containerOptions!.y == "top" || containerEl!.childElementCount === 0) {
    containerEl!.appendChild(toastEl);
  } else {
    containerEl!.insertBefore(toastEl, containerEl!.firstChild);
  }
  
  const transform = containerOptions!.y == "top"
    ? "translateY(-2rem)"
    : "translateY(2rem)";
  
  toastEl.style.transform = transform;

  setTimeout(() => {
    toastEl.style.opacity = "1";
    toastEl.style.transform = "translateY(0)";
  }, 0);
  setTimeout(() => {
    toastEl.style.opacity = "0";
    toastEl.style.transform = transform;
    
    setTimeout(() => {
      containerEl!.removeChild(toastEl);
    }, 150);
  }, options.timeout || 3000);
}
function getIcon(options: ToastOptions) {
  if (options.icon) {
    return options.icon;
  }

  if (options.type) {
    switch (options.type) {
      case "info": {
        return "fa-solid fa-circle-info";
      }
      case "danger": {
        return "fa-solid fa-circle-exclamation";
      }
      case "success": {
        return "fa-solid fa-circle-check";
      }
    }
  }

  return null;
}

export interface ToastContainerOptions {
  x: "left" | "center" | "right";
  y: "top" | "bottom";
}

export interface ToastOptions {
  type?: "info" | "danger" | "success";
  icon?: string;
  innerHtml: string;
  timeout?: number;
}