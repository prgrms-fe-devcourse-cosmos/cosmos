export type DropdownItem =
  | {
    customElement: React.ReactNode;
    onClick?: () => void;
  }
  | {
    icon?: React.ReactNode;
    label: string;
    onClick?: () => void;
    danger?: boolean;
    customElement?: never;
  };

interface DropdownProps {
  items: DropdownItem[];
  className?: string;
  size?: 'mypage' | 'post' | 'image';
}

const sizeStyles = {
  mypage: { width: '124px', height: '123px' },
  post: { width: '124px', height: '88px' },
  image: { width: '161px', height: '88px' },
};

export default function Dropdown({
  items,
  className = '',
  size = 'mypage',
}: DropdownProps) {
  const style = sizeStyles[size];

  return (
    <div
      style={style}
      className={`rounded-xl p-5 bg-[color:var(--bg-color)] border border-[rgba(144,144,144,0.4)] flex flex-col gap-4 ${className}`}
    >
      {items.map((item, index) => {
        if ('customElement' in item) {
          return <div key={index}>{item.customElement}</div>;
        }

        return (
          <button
            key={index}
            onClick={item.onClick}
            className={`flex items-center gap-2 text-xs font-pretendard cursor-pointer ${item.danger ? 'text-[#E42F42]' : 'text-[#FBFBFB]'
              } hover:opacity-80 transition`}
          >
            {item.icon && <span>{item.icon}</span>}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}