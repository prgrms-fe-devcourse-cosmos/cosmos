import { X } from "lucide-react";
import React, { useState } from "react";
import defaultImg from "../../assets/images/profile.svg";
import LabeledInput from "../common/LabeledInput";
import Button from "../common/Button";
import imageUploaderIcon from "../../assets/images/image-uploader.svg";

export default function EditProfileModal({
  userData,
  setIsEditModalOpen,
}: {
  userData: ProfileType;
  setIsEditModalOpen: () => void;
}) {
  const [usernameInput, setUsernameInput] = useState(userData?.username);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [bioInput, setBioInput] = useState(userData?.bio);

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex justify-end">
          <X onClick={setIsEditModalOpen} className="cursor-pointer" />
        </div>
        <div className="relative w-40 flex justify-center">
          <img
            src={userData?.avatar_url || defaultImg}
            className="rounded-full size-40 object-cover "
          />
          <div className="absolute bottom-0 right-0 translate-x-0 translate-y-0">
            <div className="size-10 relative z-10">
              <img src={imageUploaderIcon} className="cursor-pointer" />
            </div>
          </div>
        </div>
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
          <Button variant="back" onClick={setIsEditModalOpen}>
            CANCEL
          </Button>
        </div>

        <div className="group">
          <Button variant="hover_fill" onClick={setIsEditModalOpen}>
            SAVE
          </Button>
        </div>
      </div>
    </>
  );
}
