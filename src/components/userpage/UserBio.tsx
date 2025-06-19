import { Profile } from "../../types/type";

export default function UserBio({ userData }: { userData: Profile }) {
  return (
    <div className="border-l border-[var(--primary-300)] py-4">
      <div className="pl-5 text-sm md:text-base">
        {userData.bio ? userData.bio : "채널 소개문이 없습니다."}
      </div>
    </div>
  );
}
