import { useContext, useEffect, useState } from "react";
import { authFetch } from "../services/authFetch";
import Cropper from "react-easy-crop";
import { CompanyContext } from "../context/CompanyContext";

export function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);  
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const { loadCompany } = useContext(CompanyContext);

  useEffect(() => {
    load();
  }, []);

const load = async () => {
  const res = await authFetch("/user/profile");

  if (!res || !res.ok) return;

  const data = await res.json();

  if (!data?.user) return;

  setUser(data.user);

  setName(data.user?.name || "");
  setEmail(data.user?.email || "");
};

  const saveUser = async () => {
    await authFetch("/user/profile", {
      method: "PATCH",
      body: JSON.stringify({ name, email }),
    });
    load();
  };

  const changePassword = async () => {
    await authFetch("/user/password", {
      method: "PATCH",
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    alert("Пароль обновлён");
  };

const uploadLogo = async () => {
  if (!logoPreview || !croppedAreaPixels) return;

  const croppedBlob = await getCroppedImg(
    logoPreview,
    croppedAreaPixels
  );

  const formData = new FormData();
  formData.append("logo", croppedBlob, "logo.png");

  await authFetch("/company/logo", {
    method: "POST",
    body: formData,
  });
  await loadCompany();

  load();
};
const handleFileSelect = (e: any) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    setLogoPreview(reader.result as string);
  };
  reader.readAsDataURL(file);
};
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });

const getCroppedImg = async (imageSrc: string, crop: any) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx?.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob as Blob);
    }, "image/png");
  });
};
  if (!user) return <div>Загрузка...</div>;

  return (
    <div className="p-6 space-y-8 max-w-3xl">

      <h1 className="text-2xl font-bold">Настройки профиля</h1>

      {/* USER */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="font-semibold">Пользователь</h2>

        <input
          className="border p-2 w-full rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Имя"
        />

        <input
          className="border p-2 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <button
          onClick={saveUser}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Сохранить
        </button>
      </div>

      {/* PASSWORD */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="font-semibold">Смена пароля</h2>

        <input
          type="password"
          className="border p-2 w-full rounded"
          placeholder="Старый пароль"
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full rounded"
          placeholder="Новый пароль"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          onClick={changePassword}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Обновить пароль
        </button>
      </div>

      {/* COMPANY */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="font-semibold">Логотип компании</h2>

        {logoPreview && (
            <div className="relative w-48 h-48 bg-gray-100">
                <Cropper
                image={logoPreview}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
                />
            </div>
            )}

            <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            />

        <input
          className="border p-2 w-full rounded"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <input type="file" onChange={handleFileSelect} />
            
        <button
          onClick={uploadLogo}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Сохранить логотип
        </button>
      </div>

    </div>
  );
}