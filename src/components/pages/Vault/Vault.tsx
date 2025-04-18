import React, { useState } from "react";
import style from "./Vault.module.css";
import { Button, Modal } from "../../ui";

import folderCreateBanner from "../../../images/create-folder-banner.jpg";

type VaultFile = {
    type: "file";
    id: number;
    name: string;
    file: File;
};

type VaultFolder = {
    type: "folder";
    id: number;
    name: string;
    files: VaultFile[];
    children: VaultFolder[];
};

const Vault: React.FC = () => {
    const [showCreateFolderModal, setShowCreateFolderModal] = useState<boolean>(false);
    const [showUploadFilesModal, setShowUploadFilesModal] = useState<boolean>(false);
    const [folderName, setFolderName] = useState("New Folder");
    const [vaultItems, setVaultItems] = useState<VaultFolder[]>([]);
    const [currentFolder, setCurrentFolder] = useState<VaultFolder | null>(null);
    const [path, setPath] = useState<VaultFolder[]>([]);

    // Handle folder creation
    const handleCreateFolder = () => {
        const newFolder: VaultFolder = {
            type: "folder",
            id: Date.now(),
            name: folderName,
            files: [],
            children: [],
        };

        if (currentFolder) {
            currentFolder.children.push(newFolder);
            setVaultItems([...vaultItems]); // trigger rerender
        } else {
            setVaultItems(prev => [...prev, newFolder]);
        }

        setShowCreateFolderModal(false);
        setFolderName("New Folder");
    };


    // Handle file upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newFiles: VaultFile[] = Array.from(files).map(file => ({
            type: "file",
            id: Date.now() + Math.random(),
            name: file.name,
            file,
        }));

        if (currentFolder) {
            currentFolder.files.push(...newFiles);
            setVaultItems([...vaultItems]); // trigger rerender
        } else {
            console.log("Cannot upload files to root folder", newFiles);
        }

        setShowUploadFilesModal(false);
    };

    // Navigate into folder
    const handleOpenFolder = (folder: VaultFolder) => {
        setPath(prev => prev.concat(folder));
        setCurrentFolder(folder);
    };

    // Go back one level
    const handleGoBack = () => {
        const newPath = [...path];
        newPath.pop();
        const newCurrent = newPath.length > 0 ? newPath[newPath.length - 1] : null;
        setPath(newPath);
        setCurrentFolder(newCurrent);
    };

    // Items to display
    const displayedItems = currentFolder ? [...currentFolder.children, ...currentFolder.files] : vaultItems;

    return (
        <div className={style.vaultContainer}>
            {/* Folder Creation Modal */}
            {showCreateFolderModal && (
                <div className={style.modalWrapper}>
                    <Modal title="Create New Folder" src={folderCreateBanner} boxHeight="50%">
                        <div className={style.modalContent}>
                            <input 
                                type="text" 
                                placeholder="Enter folder name" 
                                value={folderName} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFolderName(e.target.value)} 
                            />
                            <div>
                                <Button background="red" onClick={() => setShowCreateFolderModal(false)}>Cancel</Button>
                                <Button onClick={handleCreateFolder}>Create 🗂️</Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            )}

            {showUploadFilesModal &&
                <div className={style.modalWrapper}>
                    <Modal title="Upload Files" src={folderCreateBanner} boxHeight="30%">
                        <div className={style.modalContent}>
                            <label style={{ cursor: "pointer", background: "lightgray", padding: "5px", borderRadius: "5px" }}>
                                Choose files
                                <input
                                    type="file"
                                    multiple
                                    style={{ display: "none" }}
                                    onChange={handleFileUpload}
                                />
                            </label>
                            <Button background="red" onClick={() => setShowUploadFilesModal(false)}>Cancel</Button>
                        </div>
                    </Modal>
                </div>
            }

            {/* Header */}
            <div className={style.vaultHeader}>
                <h1>{currentFolder ? currentFolder.name : "Your Vault"}</h1>
                <div>
                    <Button onClick={() => setShowUploadFilesModal(true)}>Upload 📤</Button>
                    <Button onClick={() => setShowCreateFolderModal(true)}>Create Folder 🗂️</Button>
                    {currentFolder && <Button onClick={handleGoBack}>⮜ Back</Button>}
                </div>
            </div>

            <hr /> {/* {-------------------------------} */}

            {/* Current Path */}
            <div className={style.path}>
                <strong>Path: </strong>
                {path.length === 0 ? <span>/</span> : path.map(p => p.name).join(" / ")}
            </div>

            {/* Vault Items */}
            <div className={style.folders}>
                {displayedItems.map(item => (
                    <div key={item.id} className={style.folderBox}>
                        <div className={style.folderText}>
                            {item.type === "folder" ? (
                                <div onClick={() => handleOpenFolder(item)} style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>🗂️ {item.name}</div>
                                </div>) : (
                                <p>📄 {item.name}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vault;
