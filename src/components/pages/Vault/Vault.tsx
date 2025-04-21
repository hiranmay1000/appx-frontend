import React, { useEffect, useState } from "react";
import style from "./Vault.module.css";
import { Button, Modal } from "../../ui";
import folderCreateBanner from "../../../images/create-folder-banner.jpg";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

// ----------------------
// Type Definitions
// ----------------------
type VaultFile = {
    type: "file";
    _id: string;
    name: string;
    file: string;
    filePath: string;
};

type VaultFolder = {
    type: "folder";
    _id: string;
    name: string;
    files?: VaultFile[];
    children?: VaultFolder[];
};

// ----------------------
// Component
// ----------------------
const Vault: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.users);

    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
    const [showUploadFilesModal, setShowUploadFilesModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [imgPath, setImgPath] = useState("");
    const [folderName, setFolderName] = useState("");
    const [vaultItems, setVaultItems] = useState<(VaultFolder | VaultFile)[]>([]);
    const [currentFolder, setCurrentFolder] = useState<VaultFolder | null>(null);
    const [path, setPath] = useState<VaultFolder[]>([]);

    // ----------------------
    // Fetch vault items
    // ----------------------
    const fetchItems = async () => {
        if (!user?._id) return;
        try {
            const res = await axios.get(`http://localhost:4000/api/vault/${user._id}`, {
                params: { parentId: currentFolder?._id || null },
            });

            setVaultItems(res.data);
        } catch (err) {
            console.error("Error fetching vault items:", err);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [currentFolder, user]);

    // ----------------------
    // Folder creation
    // ----------------------
    const handleCreateFolder = async () => {
        try {
            await axios.post("http://localhost:4000/api/vault/folder", {
                name: folderName || "New Folder",
                parentId: currentFolder?._id || null,
                userId: user?._id,
            });
            await fetchItems();
        } catch (err) {
            console.error("Error creating folder:", err);
        }
        setShowCreateFolderModal(false);
        setFolderName("");
    };

    // ----------------------
    // File upload
    // ----------------------
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (!fileList) {
            return;
        }

        const validateFiles = Array.from(fileList);

        const files = validateFiles.filter(file => file.type || file.size > 0);


        if (files.length < files.length) {
            alert("Some folders were excluded. Only files can be uploaded.");
        }


        const formData = new FormData();
        Array.from(files).forEach((file) => formData.append("files", file));
        formData.append("parentId", currentFolder?._id || "");
        formData.append("userId", user?._id || "");

        try {
            await axios.post("http://localhost:4000/api/vault/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            await fetchItems();
        } catch (err) {
            console.error("File upload error:", err);
        }

        setShowUploadFilesModal(false);
    };

    // ----------------------
    // Folder Navigation
    // ----------------------
    const handleOpenFolder = (folder: VaultFolder) => {
        setPath((prev) => [...prev, folder]);
        setCurrentFolder(folder);
    };

    const handleGoBack = () => {
        const newPath = [...path];
        newPath.pop();
        const newCurrent = newPath.length > 0 ? newPath[newPath.length - 1] : null;
        setPath(newPath);
        setCurrentFolder(newCurrent);
    };


    const handleDeleteClick = async (itemId: string, type: 'folder' | 'file') => {
        try {
            const response = await axios.delete('http://localhost:4000/api/vault/delete', {
                data: {
                    itemId,
                    type
                }
            });

            if (response.status === 200) {
                fetchItems();
                setVaultItems((prevItems) => prevItems.filter(item => item._id !== itemId));
            }

        } catch (error) {
            console.error("Error deleting item:", error);
        }

    }


    const handleFileClick = (file: VaultFile) => {
        setShowImageModal(true);
        setImgPath('http://localhost:4000/api' + file.filePath);
    }


    return (
        <div className={style.vaultContainer}>
            {/* ------------------ Create Folder Modal ------------------ */}
            {showCreateFolderModal && (
                <div className={style.modalWrapper}>
                    <Modal title="Create New Folder" src={folderCreateBanner} boxHeight="50%">
                        <div className={style.modalContent}>
                            <input
                                type="text"
                                placeholder="New Folder"
                                value={folderName}
                                onChange={(e) => setFolderName(e.target.value)}
                            />
                            <div>
                                <Button background="red" onClick={() => setShowCreateFolderModal(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleCreateFolder}>Create 🗂️</Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            )}

            {/* ------------------ Upload Files Modal ------------------ */}
            {showUploadFilesModal && (
                <div className={style.modalWrapper}>
                    <Modal title="Upload Files" src={folderCreateBanner} boxHeight="30%">
                        <div className={style.modalContent}>
                            <label style={{ cursor: "pointer", background: "lightgray", padding: "5px", marginRight: "5px", borderRadius: "5px" }}>
                                Choose files
                                <input type="file" multiple style={{ display: "none" }} onChange={handleFileUpload} />
                            </label>
                            <Button background="red" onClick={() => setShowUploadFilesModal(false)}>
                                Cancel
                            </Button>
                        </div>
                    </Modal>
                </div>
            )}

            {/* ------------------ Preview image Modal ------------------ */}
            {showImageModal && (
                <div className={style.modalWrapper}>
                    <Modal title="Image Preview" src={imgPath} boxHeight="50%">
                        <p></p>
                        <div className={style.modalContent}>
                            <Button onClick={() => setShowImageModal(false)} background="red" >Close</Button>
                        </div>
                    </Modal>
                </div>
            )}

            {/* ------------------ Header ------------------ */}
            <div className={style.vaultHeader}>
                <h1>{currentFolder ? currentFolder.name : "Your Vault"}</h1>
                <div>
                    <Button onClick={() => setShowUploadFilesModal(true)}>Upload 📤</Button>
                    <Button onClick={() => setShowCreateFolderModal(true)}>Create Folder 🗂️</Button>
                    {currentFolder && <Button onClick={handleGoBack}>⮜ Back</Button>}
                </div>
            </div>

            <hr />

            {/* ------------------ Path ------------------ */}
            <div className={style.path}>
                <strong>Path: </strong>
                {path.length === 0 ? <span>/</span> : path.map((p) => p.name).join(" / ")}
            </div>

            {/* ------------------ Vault Items ------------------ */}
            <div className={style.folders}>
                {vaultItems.map((item) => (
                    <div key={item._id} className={style.folderBox}>
                        <div className={style.folderText}>
                            {item.type === "folder" ? (
                                <div onClick={() => handleOpenFolder(item as VaultFolder)} style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>🗂️ {item.name}</div>
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteClick(item._id, 'folder');
                                        }}
                                        className={style.deleteVaultItem}>
                                        Delete
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div onClick={() => handleFileClick(item as VaultFile)} style={{ display: "flex", justifyContent: "space-between" }}>
                                        <p>📄 {item.name} </p>
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteClick(item._id, 'file');
                                            }}
                                            className={style.deleteVaultItem}>
                                            Delete
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vault;















/*

// -----------------------------------
// LOCALLY STORED VERSION ON VAULT.TSX
// -----------------------------------

import React, { useEffect, useState } from "react";
import style from "./Vault.module.css";
import { Button, Modal } from "../../ui";

import folderCreateBanner from "../../../images/create-folder-banner.jpg";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

type VaultFile = {
    type: "file";
    _id: string;
    name: string;
    file: File | string;
};

type VaultFolder = {
    type: "folder";
    _id: string;
    name: string;
    files?: VaultFile[];
    children?: VaultFolder[];
};

const Vault: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.users);

    const [showCreateFolderModal, setShowCreateFolderModal] = useState<boolean>(false);
    const [showUploadFilesModal, setShowUploadFilesModal] = useState<boolean>(false);
    const [folderName, setFolderName] = useState("New Folder");
    const [vaultItems, setVaultItems] = useState<VaultFolder[]>([]);
    const [currentFolder, setCurrentFolder] = useState<VaultFolder | null>(null);
    const [path, setPath] = useState<VaultFolder[]>([]);



    const fetchItems = async () => {
        const res = await axios.get(`/api/vault/${user?._id}`, {
            params: { parentId: currentFolder?._id || null },
        });
        setVaultItems(res.data);
    };

    useEffect(() => {
        if (user?._id) {
            fetchItems();
        }
    }, [currentFolder, user]);


    // Handle folder creation
    const handleCreateFolder = async () => {
        // const newFolder: VaultFolder = {
        //     type: "folder",
        //     name: folderName,
        //     files: [],
        //     children: [],
        // };

        // if (currentFolder) {
        //     currentFolder.children.push(newFolder);
        //     setVaultItems([...vaultItems]); // trigger rerender
        // } else {
        //     setVaultItems(prev => [...prev, newFolder]);
        // }

        const response = await axios.post('/api/vault/folder', {
            name: folderName,
            parentId: currentFolder?._id || null,
            userId: user?._id,
        });
        
        // Fetch updated items after backend creates and returns real _id
        await fetchItems();
        
        setShowCreateFolderModal(false);
        setFolderName("New Folder");

        setShowCreateFolderModal(false);
        setFolderName("New Folder");
    };


    // Handle file upload
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const formData = new FormData();
        Array.from(files).forEach(file => formData.append('files', file));
        formData.append('parentId', currentFolder?._id || '');
        formData.append('userId', user?._id);

        // Send to backend
        await axios.post('/api/vault/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        // Refresh items with real _id
        await fetchItems();
        setShowUploadFilesModal(false);


        // const newFiles: VaultFile[] = Array.from(files).map(file => ({
        //     type: "file",
        //     id: Date.now() + Math.random(),
        //     name: file.name,
        //     file,
        // }));

        // if (currentFolder) {
        //     currentFolder.files.push(...newFiles);
        //     setVaultItems([...vaultItems]); // trigger rerender
        // } else {
        //     console.log("Cannot upload files to root folder", newFiles);
        // }

        // const formData = new FormData();
        // for (const file of files) {
        //     formData.append('files', file);
        // }
        // formData.append('parentId', currentFolder?.id || '');
        // formData.append('userId', user._id);
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

    useEffect(() => {
        const fetchItems = async () => {
            const res = await axios.get(`/api/vault/${user?._id}`, {
                params: { parentId: currentFolder?._id || '' }
            });
            setVaultItems(res.data);
        };
        fetchItems();
    }, [currentFolder, user]);


    // Items to display
    // const displayedItems = currentFolder ? [...currentFolder.children, ...currentFolder.files] : vaultItems;

    return (
        <div className={style.vaultContainer}>
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

            <div className={style.vaultHeader}>
                <h1>{currentFolder ? currentFolder.name : "Your Vault"}</h1>
                <div>
                    <Button onClick={() => setShowUploadFilesModal(true)}>Upload 📤</Button>
                    <Button onClick={() => setShowCreateFolderModal(true)}>Create Folder 🗂️</Button>
                    {currentFolder && <Button onClick={handleGoBack}>⮜ Back</Button>}
                </div>
            </div>

            <hr /> 

            <div className={style.path}>
                <strong>Path: </strong>
                {path.length === 0 ? <span>/</span> : path.map(p => p.name).join(" / ")}
            </div>

            <div className={style.folders}>
                {displayedItems.map(item => (
                    <div key={item._id} className={style.folderBox}>
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


*/
