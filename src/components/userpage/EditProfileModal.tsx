import { X } from "lucide-react";
import { useState } from "react";
import LabeledInput from "../common/LabeledInput";
import Button from "../common/Button";
import EditProfileImage from "./EditProfileImage";
import { resetImage, updateProfile } from "../../api/user/profile";
import { useAuthStore } from "../../stores/authStore";
import { Profile } from "../../types/type";

export default function EditProfileModal({
  userData,
  setIsEditModalOpen,
  setUserData,
}: {
  userData: Profile;
  setIsEditModalOpen: (isEditModalOpen: boolean) => void;
  setUserData: (data: Profile) => void;
}) {
  const [usernameInput, setUsernameInput] = useState<string>(
    userData?.username || ""
  );
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [bioInput, setBioInput] = useState<string>(userData?.bio || "");
  const [imageUrl, setImageUrl] = useState<string>(userData?.avatar_url || "");

  const { setUser } = useAuthStore();

  if (!userData) return;

  const updateProfileHandler = async () => {
    try {
      if (imageUrl === "") {
        const updated = await resetImage(userData.id);
        setImageUrl(updated.avatar_url || "");
      }
      const updated = await updateProfile(
        userData.id,
        usernameInput,
        imageUrl,
        bioInput
      );
      if (updated && updated.length > 0) {
        setUserData(updated[0]);
        setUser("", updated[0]);
      }
      setIsEditModalOpen(false);
    } catch (e) {
      console.error("업데이트 실패 : ", e);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center relative">
        <div className="w-full flex justify-end">
          <X
            onClick={() => setIsEditModalOpen(false)}
            className="absolute top-[-70px] right-0 md:static cursor-pointer"
          />
        </div>
        <EditProfileImage
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          userId={userData.id}
        />
      </div>

      <div className="w-full space-y-4">
        <LabeledInput
          label="EMAIL"
          type="email"
          value={userData?.email}
          isEmpty={(userData?.email || "").trim().length === 0}
          disabled
        />
        <LabeledInput
          label="NAME"
          type="text"
          placeholder="이름을 입력해주세요."
          value={usernameInput}
          onChange={(e) => {
            const value = e.target.value;
            setUsernameInput(value);
            setInvalidUsername(value.trim().length === 0);
          }}
          onBlur={() => {
            setInvalidUsername((usernameInput || "").trim().length === 0);
          }}
          isInvalid={invalidUsername}
          isEmpty={(usernameInput || "").trim().length === 0}
          errorMessage="이름을 입력해주세요."
        />

        <LabeledInput
          label="BIO"
          type="text"
          placeholder="본인을 소개해주세요."
          value={bioInput || ""}
          onChange={(e) => setBioInput(e.target.value)}
          isEmpty={(bioInput || "").trim().length === 0}
        />
      </div>

      <div className="w-full flex justify-center items-center gap-10 ">
        <div className="group">
          <Button variant="back" onClick={() => setIsEditModalOpen(false)}>
            CANCEL
          </Button>
        </div>

        <div className="group">
          <Button
            variant={invalidUsername ? "disabled" : "hover_fill"}
            onClick={invalidUsername ? undefined : updateProfileHandler}
          >
            SAVE
          </Button>
        </div>
      </div>
    </>
  );
}
