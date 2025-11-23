import { HeartCrackIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function NotFound() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HeartCrackIcon />
        </EmptyMedia>
        <EmptyTitle>404 - Trang không tồn tại</EmptyTitle>
        <EmptyDescription>
          Có vẻ như trang bạn đang tìm kiếm không tồn tại. Vui lòng kiểm tra lại
          địa chỉ hoặc quay lại trang chủ.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/">Về trang chủ</Link>
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
