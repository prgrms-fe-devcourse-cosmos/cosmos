import profileImage from "../../../../public/images/alien.svg";
export default function UserProfile({ user }: { user: Profile }) {
  return (
    <div className="space-y-4 text-2xl">
      <img
        src={user?.avatar_url || profileImage}
        className="rounded-full size-12 aspect-square object-cover object-center"
      />
      <div className="space-y-1">
        <p className="text-[color:var(--primary-300)]">WELCOME</p>
        <p>{user?.username}</p>
      </div>
    </div>
  );
}
