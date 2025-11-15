import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function toast({ title, description, variant }: ToastProps) {
  const message = (
    <div>
      {title && <div className="font-semibold">{title}</div>}
      {description && <div className="text-sm opacity-100">{description}</div>}
    </div>
  );

  if (variant === "destructive") {
    sonnerToast.error(message);
  } else {
    sonnerToast.success(message);
  }
}

export function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
  };
}
