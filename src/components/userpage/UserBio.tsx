export default function UserBio({ userData }: { userData: Profile }) {
  return (
    <div className="min-h-15 mt-2">
      <div className=" border-l border-[var(--primary-300)] pl-5">
        {userData.bio ? userData.bio : "채널 소개문이 없습니다."}
      </div>
    </div>
  );
}
