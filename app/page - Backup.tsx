"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  Eye,
  BarChart3,
  GitBranch,
  Plus,
  Settings,
  Edit,
  ExternalLink,
  FileText,
  Shield,
  LogOut,
  Pencil,
  Check,
  Save,
  Archive,
  Calendar,
  MessageCircle,
  MessageSquare,
  Hash,
  Mail,
  FileSpreadsheet,
  Users,
  Link,
  Youtube,
} from "lucide-react"
import Loading , { CardSkeleton, PageSkeleton, ButtonSkeleton, ModalSkeleton, TableSkeleton, SidebarSkeleton, CSESkeleton } from "@/app/loading";
import LoginPage from "./login"
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Dashboard() {
  type NavItem = {
    id: string;
    label: string;
    icon?: any;
    action?: React.ReactNode;
    children?: NavItem[];
  }
  // --- Workspace state (inside Dashboard)
  type WSModule = { id: string; name: string; description: string; status: string; hostedLink?: string };
  type WorkspaceTab = { id: string; name: string };
  type Workspace = {
    id: string;
    label: string;
    tabs: WorkspaceTab[];
    modulesByTab: Record<string, WSModule[]>;
  };

  const [workspaces, setWorkspaces] = useState<Record<string, Workspace>>({});

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [activeView, setActiveView] = useState("home")
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [editingValue, setEditingValue] = useState("")
  const [previousValue, setPreviousValue] = useState("")
  const [editingParentId, setEditingParentId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [currentUser, setCurrentUser] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Admin", // "Admin" or "Guest"
    avatar: "JD",
    joinDate: "2024-01-15",
    lastLogin: "2024-08-29 08:30 AM",
  })
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [pendingParentId, setPendingParentId] = useState<string | null>(null)

  const canEdit = () => currentUser.role.toLowerCase() === "admin"
  useEffect(() => {
    console.log("Current user role:", currentUser.role, "Can you edit:", canEdit())
  }, [currentUser.role])
  

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const [navigationItems, setNavigationItems] = useState<NavItem[]>([
    // { id: "home", label: "Home", icon: Home },
    // {
    //   id: "alphaneural-rd",
    //   label: "AlphaNeural R&D",
    //   icon: Brain,
    //   children: [
    //     {
    //       id: "digimind",
    //       label: "DigiMind",
    //       icon: Eye,
    //       action: (
    //         <Button
    //           variant="ghost"
    //           size="icon"
    //           className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 hover:bg-cyan-100 hover:text-cyan-600 transition-colors p-0 mr-2"
    //           onClick={(e) => {
    //             e.stopPropagation()
    //             handleAddClick("digimind")
    //           }}
    //         >
    //           <Plus className="w-3 h-3" />
    //         </Button>
    //       ),
    //       children: [{ 
    //         id: "webjourneyx", 
    //         // action: (
    //         //   <Button
    //         //     variant="ghost"
    //         //     size="icon"
    //         //     className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 hover:bg-cyan-100 hover:text-cyan-600 transition-colors p-1 mr-2"
    //         //   >
    //         //     <Pencil className="w-2 h-2" />
    //         //   </Button>
    //         // ), 
    //         label: "WebJourneyX" }],
    //     },
    //     {
    //       id: "equimind",
    //       label: "Equimind",
    //       icon: BarChart3,
    //       action: (
    //         <Button
    //           variant="ghost"
    //           size="icon"
    //           className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 hover:bg-cyan-100 hover:text-cyan-600 transition-colors p-0 mr-2"
    //           onClick={(e) => {
    //             e.stopPropagation()
    //             handleAddClick("equimind")
    //           }}
    //         >
    //           <Plus className="w-3 h-3" />
    //         </Button>
    //       ),
    //       children: [
    //         { id: "market-indicators",
    //           // action: (
    //           //   <Button
    //           //     variant="ghost"
    //           //     size="icon"
    //           //     className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 hover:bg-cyan-100 hover:text-cyan-600 transition-colors p-1 mr-2"
    //           //   >
    //           //     <Pencil className="w-2 h-2" />
    //           //   </Button>
    //           // ), 
    //           label: "CSE Market Intelligence" },
    //         { id: "macro-indicators", 
    //           // action: (
    //           //   <Button
    //           //     variant="ghost"
    //           //     size="icon"
    //           //     className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 hover:bg-cyan-100 hover:text-cyan-600 transition-colors p-1 mr-2"
    //           //   >
    //           //     <Pencil className="w-2 h-2" />
    //           //   </Button>
    //           // ), 
    //           label: "Srilankan Macro Intelligence" },
    //       ],
    //     },
    //     { id: "propmind", 
    //       label: "propMind", 
    //       action: (
    //         <Button
    //           variant="ghost"
    //           size="icon"
    //           className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 hover:bg-cyan-100 hover:text-cyan-600 transition-colors p-0 mr-2"
    //           onClick={(e) => {
    //             e.stopPropagation()
    //             handleAddClick("propmind")
    //           }}
    //         >
    //           <Plus className="w-3 h-3" />
    //         </Button>
    //       ),
    //       icon: Home },
    //   ],
    // },
    // { id: "project-pipeline", label: "Project Pipeline", icon: GitBranch, },
    // { id: "internal-knowledge-repo", label: "Internal Knowledge Repo", icon: Archive ,
    //   children:[{ 
    //       id: "meeting-notes", 
    //       label: "Meeting minutes and notes", 
    //       // action: (
    //       //   <Button
    //       //     variant="ghost"
    //       //     size="icon"
    //       //     className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 hover:bg-cyan-100 hover:text-cyan-600 transition-colors p-0 mr-2"
    //       //     onClick={(e) => {
    //       //       e.stopPropagation()
    //       //       handleAddClick("meeting-notes")
    //       //     }}
    //       //   >
    //       //     <Plus className="w-3 h-3" />
    //       //   </Button>
    //       // ),
    //       icon: Calendar  },
    //     { id: "whatsapp-extracts", 
    //       label: "Whatsapp Extracts", 
    //       // action: (
    //       //   <Button
    //       //     variant="ghost"
    //       //     size="icon"
    //       //     className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 hover:bg-cyan-100 hover:text-cyan-600 transition-colors p-0 mr-2"
    //       //     onClick={(e) => {
    //       //       e.stopPropagation()
    //       //       handleAddClick("whatsapp-extracts")
    //       //     }}
    //       //   >
    //       //     <Plus className="w-3 h-3" />
    //       //   </Button>
    //       // ),
    //       icon: MessageCircle  },]
    // },
    // { id: "meeting-notes", label: "Meeting minutes and notes", icon: FileText },
  ])

  const [loadingNavigation, setLoadingNavigation] = useState(true);

  // Map API icon strings to lucide-react components
  const iconMap: Record<string, any> = {
    Brain,
    Menu,
    X,
    ChevronDown,
    ChevronRight,
    Home,
    Eye,
    BarChart3,
    GitBranch,
    Plus,
    Settings,
    Edit,
    ExternalLink,
    FileText,
    Shield,
    LogOut,
    Pencil,
    Check,
    Save,
    Archive,
    Calendar,
    MessageCircle,
  }

  const normalizeSidebarData = (items: any[]): NavItem[] => {
    const actionableIds = new Set([
      "digimind",
      "equimind",
      "propmind",
    ])
    return (items || []).map((item: any): NavItem => {
      const IconComponent = typeof item.icon === 'string' ? (iconMap[item.icon] || FileText) : (item.icon || FileText)
      const shouldHaveAction = actionableIds.has(item.id)
      const actionEl = shouldHaveAction && canEdit() ? (
        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 hover:bg-cyan-100 hover:text-cyan-600 transition-colors p-0 mr-2"
          onClick={(e) => {
            e.stopPropagation()
            handleAddClick(item.id)
          }}
        >
          <Plus className="w-3 h-3" />
        </Button>
      ) : undefined
      return {
        ...item,
        icon: IconComponent,
        action: actionEl,
        children: item.children ? normalizeSidebarData(item.children) : undefined,
      }
    })
  }

  useEffect(() => {
    const base = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/,'')
    const url = `${base}/api/resources/getsidebar`
    if (!base) {
      setLoadingNavigation(false);
      return;
    }
    ;(async () => {
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Failed to load sidebar: ${res.status}`)
        const data = await res.json()
        const normalized = normalizeSidebarData(data)
        setNavigationItems(normalized)
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingNavigation(false);
      }
    })()
  }, [])

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
      setIsLoading(false);
    }, []);

  // Note: Removed initial loadWorkspaces call to improve page loading speed
  // Workspaces will only be loaded when clicking on dynamic items (gc-*)

// Transform backend -> frontend (allow overriding the id we store under)
const transformWorkspaceData = (backendWorkspace: any, overrideId?: string): Workspace => {
  return {
    id: overrideId || backendWorkspace.id,
    label: backendWorkspace.label,
    tabs: backendWorkspace.tabs || [],
    modulesByTab: backendWorkspace.modulesByTab || {},
  };
};

  // Load specific workspace data when a nav child is clicked (predefined or dynamic)
const loadWorkspaceData = async (workspaceKey: string, fallbackLabel?: string) => {
  const base = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '');
  if (!base) {
    console.warn('No API base URL configured');
    return;
  }

  setLoadingWorkspace(true);

  try {
    const response = await fetch(`${base}/api/resources/getworkspaces`);
    if (!response.ok) {
      console.warn('Failed to load workspace data:', response.status);
      return;
    }

    const responseData = await response.json();
    const workspacesData = responseData.workspaces || responseData;

    if (Array.isArray(workspacesData)) {
      // Try match by id first, then by label (for predefined grandchildren)
      const backendWorkspace =
        workspacesData.find((w: any) => w.id === workspaceKey) ||
        (fallbackLabel
          ? workspacesData.find((w: any) => (w.label || '').trim().toLowerCase() === fallbackLabel.trim().toLowerCase())
          : undefined);

      if (backendWorkspace) {
        // Important: store under the clicked key (workspaceKey)
        const transformed = transformWorkspaceData(backendWorkspace, workspaceKey);
        setWorkspaces(prev => ({ ...prev, [workspaceKey]: transformed }));
      } else {
        console.warn('Workspace not found for key/label:', workspaceKey, fallbackLabel);
      }
    } else {
      console.warn('Invalid workspaces data format:', workspacesData);
    }
  } catch (error) {
    console.error('Error loading workspace data:', error);
  } finally {
    setLoadingWorkspace(false);
  }
};

  
    const handleLogin = (userData: { name: string; email: string; role: string }) => {
      setCurrentUser({
        name: userData.name,
        email: userData.email,
        role: userData.role,
        avatar: userData.name.split(" ").map((n) => n[0]).join(""),
        joinDate: new Date().toISOString().split("T")[0],
        lastLogin: new Date().toLocaleString(),
      });
      setIsLoggedIn(true);
    };
  
  const handleSignOut = () => {
    console.log("signing out")
      localStorage.removeItem('currentUser');
      setIsLoggedIn(false);
      setShowUserProfile(false);
      setCurrentUser({
          name: "Guest",
          email: "",
          role: "Guest",
          avatar: "G",
          joinDate: "N/A",
          lastLogin: "N/A",
      });
    };

    const ACTIONABLE_IDS = new Set(["digimind", "equimind", "propmind"]); // keep this near top

    const handleAddClick = (parentId: string) => {
      if (!canEdit()) return;
      if (!ACTIONABLE_IDS.has(parentId)) return; // safety
      setPendingParentId(parentId);
      setShowConfirmDialog(true);
    };
    

  const [isAdding, setIsAdding] = useState(false)
  const [loadingWorkspace, setLoadingWorkspace] = useState(false)

  // Debug: Monitor activeView changes
  useEffect(() => {
    console.log('ActiveView changed to:', activeView);
  }, [activeView]);
  // const confirmAddNewChild = async () => {
  //   if (!pendingParentId) return
  //   setIsAdding(true)

  //   const newId = `new-${Date.now()}`
  //   const newChild = {
  //     id: newId,
  //     label: "New Item",
  //   }

  //   // Send data to API
  //   try {
  //     const base = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/,'')
  //     const url = `${base}/api/resources/addsidebar`
  //     console.log("here are them", pendingParentId, " ", name)
  //     if (base) {
  //       const response = await fetch(url, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           parent: pendingParentId,
  //           name: "New Item"
  //         })
  //       })
  //       if (!response.ok) {
  //         console.error('Failed to add sidebar item:', response.status)
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error adding sidebar item:', error)
  //   }

  //   setNavigationItems(prevItems => 
  //     prevItems.map(item => {
  //       if (item.id === "alphaneural-rd" && item.children) {
  //         return {
  //           ...item,
  //           children: item.children.map(child => {
  //             if (child.id === pendingParentId) {
  //               return {
  //                 ...child,
  //                 children: [...(child.children || []), newChild]
  //               }
  //             }
  //             return child
  //           })
  //         }
  //       }
  //       return item
  //     })
  //   )

  //   // Start editing the new item
  //   setEditingItem(newId)
  //   setEditingValue("New Item")
  //   setEditingParentId(pendingParentId)
    
  //   // Ensure the parent section is expanded
  //   if (!expandedSections.includes("alphaneural-rd")) {
  //     setExpandedSections(prev => [...prev, "alphaneural-rd"])
  //   }
  //   if (!expandedSections.includes(pendingParentId)) {
  //     setExpandedSections(prev => [...prev, pendingParentId])
  //   }

  //   // Close dialog and reset
  //   setShowConfirmDialog(false)
  //   setPendingParentId(null)
  //   setIsAdding(false)
  // }
  const confirmAddNewChild = async () => {
    if (!pendingParentId) return;
    setIsAdding(true);
  
    // Generate a predictable id for local state
    const newId = `gc-${Date.now()}`;
    const newLabel = "New Item";
    const firstTabId = `tab-${Date.now()}`;
    
    // Create the complete workspace structure
    const workspaceData = {
      id: newId,
      label: newLabel,
      tabs: [{ id: firstTabId, name: "Tab_01" }],
      modulesByTab: { [firstTabId]: [] }
    };
  
    // 1) Send complete workspace data to backend
    const base = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '');
    const url = `${base}/api/resources/addsidebar`;
  
    try {
      if (base) {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            parent: pendingParentId, 
            name: newLabel,
            workspaceData: workspaceData,
            workspaceId: newId
          })
        });
        
        if (!response.ok) {
          throw new Error(`Failed to create workspace: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log("Workspace created successfully:", result);
      } else {
        console.warn("No API base URL configured, workspace will only exist locally");
      }
    } catch (e) {
      console.error("Failed to create workspace in backend:", e);
      // Still proceed with local creation even if backend fails
    }
  
    // 2) Update local sidebar state
    setNavigationItems(prev =>
      prev.map(item => {
        if (item.id === "alphaneural-rd" && item.children) {
          return {
            ...item,
            children: item.children.map(child => {
              if (child.id === pendingParentId) {
                const newChild = { id: newId, label: newLabel };
                return { ...child, children: [...(child.children || []), newChild] };
              }
              return child;
            })
          };
        }
        return item;
      })
    );
  
    // 3) Create workspace in local state
    setWorkspaces(prev => ({
      ...prev,
      [newId]: workspaceData
    }));
  
    // 4) Open the new workspace view immediately
    setActiveView(newId);
  
    // expand parent sections (same behavior you had)
    if (!expandedSections.includes("alphaneural-rd")) {
      setExpandedSections(prev => [...prev, "alphaneural-rd"]);
    }
    if (!expandedSections.includes(pendingParentId)) {
      setExpandedSections(prev => [...prev, pendingParentId!]);
    }
  
    setShowConfirmDialog(false);
    setPendingParentId(null);
    setIsAdding(false);
  };
  // Keep sidebar and workspace in sync when renaming the resource
const renameWorkspace = async (wid: string, newName: string) => {
  // 1) Update workspace state
  setWorkspaces(prev => ({ ...prev, [wid]: { ...prev[wid], label: newName } }));

  // 2) Update sidebar label that matches wid
  setNavigationItems(prev =>
    prev.map(item => {
      if (!item.children) return item;
      return {
        ...item,
        children: item.children.map(child => {
          if (!child.children) return child;
          return {
            ...child,
            children: child.children.map(gc => (gc.id === wid ? { ...gc, label: newName } : gc))
          };
        })
      };
    })
  );

  // 3) API stub
  const base = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '');
  if (base) {
    await fetch(`${base}/api/resources/editresourcename`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: wid, name: newName }),
    });
  }
};

// Add a new tab to this workspace
// const addWorkspaceTab = async (wid: string) => {
//   setWorkspaces(prev => {
//     const ws = prev[wid];
//     const nextIdx = ws.tabs.length + 1;
//     const tab = { id: `tab-${Date.now()}`, name: `Tab_${nextIdx.toString().padStart(2, "0")}` };
//     return { ...prev, [wid]: { ...ws, tabs: [...ws.tabs, tab] } };
//   });

//   const base = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '');
//   if (base) {
//     await fetch(`${base}/api/resources/addtab`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ resourceId: wid }),
//     });
//   }
// };

// Rename a tab
// const renameWorkspaceTab = async (wid: string, tabId: string, newName: string) => {
//   setWorkspaces(prev => {
//     const ws = prev[wid];
//     return {
//       ...prev,
//       [wid]: {
//         ...ws,
//         tabs: ws.tabs.map(t => (t.id === tabId ? { ...t, name: newName } : t))
//       }
//     };
//   });

//   const base = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '');
//   if (base) {
//     await fetch(`${base}/api/resources/edittabname`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ resourceId: wid, tabId, name: newName }),
//     });
//   }
// };


  const cancelAddNewChild = () => {
    setShowConfirmDialog(false)
    setPendingParentId(null)
  }

  const saveEdit = async (itemId: string) => {
    if (!editingValue.trim()) return

    // Send updated name to API
    try {
      const base = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/,'')
      const url = `${base}/api/resources/editsidebar`
      
      if (base) {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            parent: editingParentId, // Use the tracked parent ID
             previousName: previousValue || "New Item",
            name: editingValue.trim()
          })
        })
        
        if (!response.ok) {
          console.error('Failed to update sidebar item:', response.status)
        }
      }
    } catch (error) {
      console.error('Error updating sidebar item:', error)
    }

    setNavigationItems(prevItems => 
      prevItems.map(item => {
        if (item.id === "alphaneural-rd" && item.children) {
          return {
            ...item,
            children: item.children.map(child => {
              if (child.children) {
                return {
                  ...child,
                  children: child.children.map(grandchild => {
                    if (grandchild.id === itemId) {
                      return {
                        ...grandchild,
                        label: editingValue.trim()
                      }
                    }
                    return grandchild
                  })
                }
              }
              return child
            })
          }
        }
        return item
      })
    )

    setWorkspaces(prev => {
      if (!prev[itemId]) return prev
      return { ...prev, [itemId]: { ...prev[itemId], label: editingValue.trim() } }
    })

    setEditingItem(null)
    setEditingValue("")
    setPreviousValue("")
    setEditingParentId(null)
  }

  const cancelEdit = () => {
    setEditingItem(null)
    setEditingValue("")
    setEditingParentId(null)
  }

  // const renameWorkspace = async (wid: string, newName: string) => {
  //   // update workspace
  //   setWorkspaces(prev => ({ ...prev, [wid]: { ...prev[wid], label: newName } }))
  //   // sync sidebar label
  //   setNavigationItems(prev =>
  //     prev.map(item => ({
  //       ...item,
  //       children: item.children?.map(child => ({
  //         ...child,
  //         children: child.children?.map(gc => (gc.id === wid ? { ...gc, label: newName } : gc))
  //       }))
  //     }))
  //   )
  
  //   const base = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/,'')
  //   if (base) {
  //     await fetch(`${base}/api/resources/editresourcename`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ id: wid, name: newName })
  //     })
  //   }
  // }
  
  const addWorkspaceTab = async (wid: string) => {
    const newTabId = `tab-${Date.now()}`
    setWorkspaces(prev => {
      const ws = prev[wid]
      return {
        ...prev,
        [wid]: {
          ...ws,
          tabs: [...ws.tabs, { id: newTabId, name: `Tab_${(ws.tabs.length+1).toString().padStart(2,"0")}` }],
          modulesByTab: { ...ws.modulesByTab, [newTabId]: [] }
        }
      }
    })
  
    const base = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/,'')
    if (base) {
      await fetch(`${base}/api/resources/addtab`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceId: wid })
      })
    }
  }
  
  const renameWorkspaceTab = async (wid: string, tabId: string, newName: string) => {
    setWorkspaces(prev => {
      const ws = prev[wid]
      return {
        ...prev,
        [wid]: { ...ws, tabs: ws.tabs.map(t => (t.id === tabId ? { ...t, name: newName } : t)) }
      }
    })
  
    const base = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/,'')
    if (base) {
      await fetch(`${base}/api/resources/edittabname`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceId: wid, tabId, name: newName })
      })
    }
  }
  
  const addWorkspaceModule = async (wid: string, tabId: string) => {
    const newModule: WSModule = {
      id: `mod-${Date.now()}`,
      name: "New Module",
      description: "Describe the module...",
      status: "Not yet started",
      hostedLink: ""
    }
    setWorkspaces(prev => {
      const ws = prev[wid]
      return {
        ...prev,
        [wid]: {
          ...ws,
          modulesByTab: {
            ...ws.modulesByTab,
            [tabId]: [...(ws.modulesByTab[tabId] || []), newModule]
          }
        }
      }
    })
  
    const base = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/,'')
    if (base) {
      await fetch(`${base}/api/resources/addmodule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceId: wid, tabId, module: newModule })
      })
    }
  }

  
  const [editingLoadingId, setEditingLoadingId] = useState<string | null>(null)
  const startEdit = (itemId: string, currentLabel: string) => {
    if (!canEdit()) return
    setEditingLoadingId(itemId)
    // Find the parent ID for existing items
    let parentId = null
    navigationItems.forEach(item => {
      if (item.children) {
        item.children.forEach(child => {
          if (child.children) {
            child.children.forEach(grandchild => {
              if (grandchild.id === itemId) {
                parentId = child.id
              }
            })
          }
        })
      }
    })
    
    setEditingItem(itemId)
    setEditingValue(currentLabel)
    setPreviousValue(currentLabel)
    setEditingParentId(parentId)
    setEditingLoadingId(null)
  }

  const renderContent = () => {
    switch (activeView) {
      case "home":
        return <HomeContent />
      case "digimind":
        return <DigiMindContent />
      case "webjourneyx":
        return <WebJourneyXContent canEdit={canEdit()} />
      case "equimind":
        return <EquimindContent />
      case "market-indicators":
        return <MarketIndicatorsContent canEdit={canEdit()} />
      case "macro-indicators":
        return <MacroIndicatorsContent canEdit={canEdit()} />
      case "propmind":
        return <PropMindContent canEdit={canEdit()} />
      case "project-pipeline":
        return <ProjectPipelineContent canEdit={canEdit()} />
      case "meeting-notes":
        return <MeetingNotesContent canEdit={canEdit()} />
      case "internal-knowledge-repo":
        return <KnowledgeManagementContent />
      case "whatsapp-extracts":
        return <CommChannelsContent />
        default: {
          const ws = workspaces[activeView]
          console.log('Rendering workspace for activeView:', activeView, 'workspace:', ws, 'loadingWorkspace:', loadingWorkspace, 'all workspaces:', workspaces)
          
          if (ws) {
            console.log('Found workspace, rendering WorkspaceWebJourneyX with data:', ws)
            return (
              <WorkspaceWebJourneyX
                wid={activeView}
                ws={ws}
                canEdit={canEdit()}
                onRenameWS={renameWorkspace}
                onAddTab={addWorkspaceTab}
                onRenameTab={renameWorkspaceTab}
                onAddModule={addWorkspaceModule}
              />
            )
          }
          if (loadingWorkspace) {
            return (
              <>
                <CSESkeleton/>
              </>
            )
          }
          
          // If no workspace found and not loading, try to load it only for dynamic items
          if (activeView && activeView.startsWith('gc-')) {
            console.log('No workspace found for dynamic activeView:', activeView, 'attempting to load...')
            loadWorkspaceData(activeView)
            return (
              <div className="flex items-center justify-center h-64">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-600"></div>
                  <span className="text-slate-600">Loading workspace data...</span>
                </div>
              </div>
            )
          }
          
          console.log('No workspace found for activeView:', activeView, 'showing HomeContent')
          return <HomeContent />
        }
        
      }
  }

  if (isLoading) {
    return <PageSkeleton/>
  }
  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      <aside
        className={`${sidebarCollapsed ? "w-25" : "w-80"} bg-white border-r border-slate-200 fixed left-0 top-0 h-full z-40 transition-all duration-300 md:relative md:translate-x-0 ${sidebarCollapsed ? "" : "translate-x-0"}`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className=" overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <div className={`flex items-center space-x-3 ${sidebarCollapsed ? "justify-center" : ""}`}>
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-600 to-cyan-800 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                {!sidebarCollapsed && (
                  <div>
                    <h1 className="text-xl font-bold text-slate-900">Internal Work Management Systems (IWMS)</h1>
                  </div>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-2">
                {sidebarCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <nav className="space-y-1">
          {
            loadingNavigation 
              ? <SidebarSkeleton /> 
            : (
              <>
                {navigationItems.map((item) => (
                  <div key={item.id}>
                    <div
                      className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                        activeView === item.id
                          ? "text-cyan-700 bg-cyan-50 font-medium"
                          : "text-slate-600 hover:text-cyan-700 hover:bg-slate-50"
                      }`}
                      onClick={() => {
                        setActiveView(item.id)
                        if (item.children) {
                          toggleSection(item.id)
                        }
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        {!sidebarCollapsed && <span>{item.label}</span>}
                      </div>
                      {!sidebarCollapsed && item.children && (
                        <div className="ml-auto">
                          {expandedSections.includes(item.id) ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </div>
                      )}
                    </div>

                    {!sidebarCollapsed && item.children && expandedSections.includes(item.id) && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <div key={child.id}>
                            <div
                              className={`flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                                activeView === child.id
                                  ? "text-cyan-600 bg-cyan-50 font-medium"
                                  : "text-slate-500 hover:text-cyan-600 hover:bg-slate-50"
                              }`}
                              onClick={() => {
                                setActiveView(child.id)
                                if (child.children) {
                                  toggleSection(child.id)
                                }
                              }}
                            >
                              <div className="flex items-center space-x-3">
                                {child.icon && 
                                  <child.icon className="w-4 h-4" />
                                }
                                <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                                <span className="flex-1 text-left leading-tight">{child.label}</span>
                                <div className="w-5 h-5 flex items-center justify-center">
                                  {canEdit() ? child.action : null}
                                </div>
                              </div>
                              {child.children && (
                                <div className="ml-auto">
                                  {expandedSections.includes(child.id) ? (
                                    <ChevronDown className="w-3 h-3" />
                                  ) : (
                                    <ChevronRight className="w-3 h-3" />
                                  )}
                                </div>
                              )}
                            </div>

                            {child.children && expandedSections.includes(child.id) && (
                              <div className="ml-8 mt-1 space-y-1">
                                {child.children.map((grandchild) => (
                                  <div
                                    key={grandchild.id}
                                    className={`flex items-center space-x-3 px-4 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                                      activeView === grandchild.id
                                        ? "text-cyan-600 bg-cyan-50 font-medium"
                                        : "text-slate-400 hover:text-cyan-600 hover:bg-slate-50"
                                    }`}
                                    onClick={async () => {
                                      console.log('Clicked on grandchild:', grandchild.id, 'label:', grandchild.label);
                                      console.log('Grandchild ID starts with gc-?', grandchild.id.startsWith('gc-'));
                                      
                                      // Test if click is working
                                      // alert(`Clicked on: ${grandchild.label} (ID: ${grandchild.id})`);
                                      
                                      // Only load workspace data from backend for dynamically created items (starting with 'gc-')
                                      if (grandchild.id.startsWith('gc-')) {
                                        console.log('Loading workspace data for dynamic item:', grandchild.id);
                                        await loadWorkspaceData(grandchild.id);
                                      } else {
                                        console.log('Static item clicked, no API call needed:', grandchild.id);
                                      }
                                      
                                      setActiveView(grandchild.id);
                                    }}
                                  >
                                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                                    {editingItem === grandchild.id ? (
                                      <div className="flex items-center space-x-2 flex-1">
                                        <input
                                          type="text"
                                          value={editingValue}
                                          onChange={(e) => setEditingValue(e.target.value)}
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                              saveEdit(grandchild.id)
                                            } else if (e.key === 'Escape') {
                                              cancelEdit()
                                            }
                                          }}
                                          className="flex-1 px-2 py-1 text-xs border border-cyan-300 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 bg-white"
                                          autoFocus
                                        />
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            saveEdit(grandchild.id)
                                          }}
                                          className="w-4 h-4 p-0 text-green-600 hover:text-green-700"
                                        >
                                          <Check className="w-3 h-3" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            cancelEdit()
                                          }}
                                          className="w-4 h-4 p-0 text-red-600 hover:text-red-700"
                                        >
                                          <X className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    ) : (
                                      <>
                                        <span className="flex-1">{grandchild.label}</span>
                                        <div className="flex items-center space-x-1">
                                          {(grandchild as any).action}
                                          {canEdit() && (
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                startEdit(grandchild.id, grandchild.label)
                                              }}
                                              className="w-4 h-4 p-0 text-slate-400 hover:text-slate-600"
                                            >
                                              <Edit className="w-2 h-2" />
                                            </Button>
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))} 
              </>
            )
          }
          </nav>

          {!sidebarCollapsed && (
            // <div className="absolute bottom-6 left-6 right-6"></div>
              <div className="border-t border-slate-200 pt-4 mt-auto">
                <div
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors hover:bg-slate-50"
                  onClick={() => setShowUserProfile(true)}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-600 to-cyan-800 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {currentUser.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{currentUser.name}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant={currentUser.role === "Admin" ? "default" : "secondary"} className="text-xs">
                        {currentUser.role}
                      </Badge>
                    </div>
                  </div>
                  <Settings className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            
          )}

          {sidebarCollapsed && (
            <div className="absolute bottom-6 left-2 right-2">
              <div className="border-t border-slate-200 pt-4">
                <Button variant="ghost" size="sm" className="w-full p-2" onClick={() => setShowUserProfile(true)}>
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-600 to-cyan-800 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {currentUser.avatar}
                  </div>
                </Button>
              </div>
            </div>
          )}
        </div>
      </aside>

      <div className={`flex-1 transition-all duration-300 ml-0`}>
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {navigationItems.find((item) => item.id === activeView)?.label ||
                    navigationItems.flatMap((item) => item.children || []).find((child) => child.id === activeView)
                      ?.label ||
                    "Dashboard"}
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  All Systems Online
                </Badge>
                <Badge variant={currentUser.role === "Admin" ? "default" : "secondary"} className="hidden md:flex">
                  <Shield className="w-3 h-3 mr-1" />
                  {currentUser.role}
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 md:px-6 py-4 md:py-8">{renderContent()}</main>
      </div>

      {showUserProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">User Profile</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowUserProfile(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Profile Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-cyan-800 rounded-full flex items-center justify-center text-white text-xl font-medium">
                    {currentUser.avatar}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-slate-900">{currentUser.name}</h4>
                    <p className="text-sm text-slate-500">{currentUser.email}</p>
                    <Badge variant={currentUser.role === "Admin" ? "default" : "secondary"} className="mt-1">
                      <Shield className="w-3 h-3 mr-1" />
                      {currentUser.role}
                    </Badge>
                  </div>
                </div>

                {/* Account Details */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Join Date</label>
                    <p className="text-sm text-slate-600">{currentUser.joinDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Last Login</label>
                    <p className="text-sm text-slate-600">{currentUser.lastLogin}</p>
                  </div>
                </div>

                {/* Role Permissions */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Permissions</label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">View Dashboards</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Allowed
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Create/Edit Content</span>
                      <Badge
                        variant="outline"
                        className={
                          currentUser.role.toLowerCase() === "admin" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                        }
                      >
                        {currentUser.role.toLowerCase() === "admin" ? "Allowed" : "Restricted"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">User Management</span>
                      <Badge
                        variant="outline"
                        className={
                          currentUser.role.toLowerCase() === "admin" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                        }
                      >
                        {currentUser.role.toLowerCase() === "admin" ? "Allowed" : "Restricted"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Settings */}
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Confirm Action</h3>
                <Button variant="ghost" size="sm" onClick={cancelAddNewChild}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="mb-6">
                <p className="text-slate-600">Do you want to create a new item?</p>
                {isAdding && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-600"></div>
                      <span className="text-sm text-cyan-700">Creating workspace and saving to backend...</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <Button 
                  onClick={confirmAddNewChild} 
                  disabled={isAdding}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50"
                >
                  {isAdding ? "Creating..." : "Yes, Create"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={cancelAddNewChild} 
                  className="flex-1"
                  disabled={isAdding}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function WorkspaceWebJourneyX({
  wid,
  ws,
  canEdit,
  onRenameWS,
  onAddTab,
  onRenameTab,
  onAddModule,
}: {
  wid: string
  ws: Workspace
  canEdit: boolean
  onRenameWS: (wid: string, newName: string) => void
  onAddTab: (wid: string) => void
  onRenameTab: (wid: string, tabId: string, newName: string) => void
  onAddModule: (wid: string, tabId: string) => void
}) {
  const [activeTabId, setActiveTabId] = useState(ws.tabs[0]?.id || "")

  // --- inline edit state ---
  const [isEditingWS, setIsEditingWS] = useState(false)
  const [wsLabelDraft, setWsLabelDraft] = useState(ws.label)
  const [editingTabId, setEditingTabId] = useState<string | null>(null)
  const [tabDraft, setTabDraft] = useState<string>("")

  useEffect(() => {
    // keep draft in sync if ws changes from backend
    setWsLabelDraft(ws.label)
    if (!ws.tabs.find((t) => t.id === activeTabId) && ws.tabs[0]) {
      setActiveTabId(ws.tabs[0].id)
    }
  }, [ws])

  const modules = ws.modulesByTab[activeTabId] || []

  // --- workspace title editing handlers ---
  const startEditWS = () => {
    if (!canEdit) return
    setWsLabelDraft(ws.label)
    setIsEditingWS(true)
  }
  const saveWS = () => {
    if (!canEdit) return
    onRenameWS(wid, wsLabelDraft.trim() || ws.label)
    setIsEditingWS(false)
  }
  const cancelWS = () => {
    setWsLabelDraft(ws.label)
    setIsEditingWS(false)
  }

  // --- tab name editing handlers ---
  const startEditTab = (tabId: string, current: string) => {
    if (!canEdit) return
    setEditingTabId(tabId)
    setTabDraft(current)
  }
  const saveTab = () => {
    if (!canEdit || !editingTabId) return
    onRenameTab(wid, editingTabId, tabDraft.trim() || ws.tabs.find(t => t.id === editingTabId)?.name || "Tab")
    setEditingTabId(null)
    setTabDraft("")
  }
  const cancelTab = () => {
    setEditingTabId(null)
    setTabDraft("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800"
      case "Ongoing": return "bg-blue-100 text-blue-800"
      case "Not yet started": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Title row (like WebJourneyX) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {!isEditingWS ? (
            <>
              <h1 className="text-3xl font-bold text-slate-900">{ws.label}</h1>
              {canEdit && (
                <button
                  className="p-1 rounded hover:bg-slate-100 text-slate-500"
                  onClick={startEditWS}
                  aria-label="Edit workspace name"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <div className="flex items-center gap-2">
              <input
                value={wsLabelDraft}
                onChange={(e) => setWsLabelDraft(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                autoFocus
              />
              <button
                className="p-2 rounded text-green-600 hover:bg-green-50"
                onClick={saveWS}
                aria-label="Save workspace name"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded text-red-600 hover:bg-red-50"
                onClick={cancelWS}
                aria-label="Cancel edit"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        {/* {canEdit && (
          <button
            onClick={() => onAddModule(wid, activeTabId)}
            className="px-4 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Module
          </button>
        )} */}
      </div>

      {/* Tabs (match WebJourneyX look) */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {ws.tabs.map((tab) => {
          const isActive = activeTabId === tab.id
          const isEditing = editingTabId === tab.id
          return (
            <div key={tab.id} className="flex items-center">
              {!isEditing ? (
                <button
                  onClick={() => setActiveTabId(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2
                    ${isActive ? "text-cyan-600 border-b-2 border-cyan-600 bg-cyan-50"
                               : "text-slate-600 hover:text-cyan-600 hover:bg-slate-50"}`}
                >
                  <span>{tab.name}</span>
                  {canEdit && (
                    <span
                      onClick={(e) => { e.stopPropagation(); startEditTab(tab.id, tab.name) }}
                      className="p-1 rounded hover:bg-slate-100 text-slate-500"
                      aria-label="Edit tab name"
                    >
                      <Pencil className="w-3 h-3" />
                    </span>
                  )}
                </button>
              ) : (
                <div className="flex items-center gap-1 px-2 py-1">
                  <input
                    value={tabDraft}
                    onChange={(e) => setTabDraft(e.target.value)}
                    className="px-2 py-1 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveTab()
                      if (e.key === "Escape") cancelTab()
                    }}
                  />
                  <button className="p-1 text-green-600 hover:bg-green-50 rounded" onClick={saveTab} aria-label="Save tab">
                    <Check className="w-3 h-3" />
                  </button>
                  <button className="p-1 text-red-600 hover:bg-red-50 rounded" onClick={cancelTab} aria-label="Cancel">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          )
        })}
        {canEdit && (
          <button
            onClick={() => onAddTab(wid)}
            className="px-3 py-2 text-sm rounded-md border border-cyan-300 text-cyan-700 hover:bg-cyan-50"
          >
            + Tab
          </button>
        )}
      </div>

      {/* Section title (matches WebJourneyX) */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          {ws.tabs.find((t) => t.id === activeTabId)?.name} Modules
        </h2>
        {canEdit && (
          <button
            onClick={() => onAddModule(wid, activeTabId)}
            className="px-4 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Module
          </button>
        )}
      </div>

      {/* Modules grid (unchanged, WebJourneyX style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((m) => (
          <div
            key={m.id}
            className="p-6 rounded-lg border border-slate-200 bg-white hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-slate-900">{m.name}</h3>
                <span className={`px-2 py-1 text-xs rounded ${getStatusColor(m.status)}`}>
                  {m.status}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{m.description || " "}</p>
            </div>

            <div className="flex items-center justify-between mt-4">
              {m.hostedLink ? (
                <a
                  href={m.hostedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 border rounded text-sm"
                >
                  View Live
                </a>
              ) : (
                <span className="text-xs text-slate-400">No hosted link</span>
              )}
              {canEdit && (
                <button className="text-slate-500 text-sm hover:text-cyan-600" title="Edit module">
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


function ResourceWorkspace({
  wid,
  workspace,
  canEdit,
  onRenameWorkspace,
  onAddTab,
  onRenameTab,
}: {
  wid: string;
  workspace: Workspace;
  canEdit: boolean;
  onRenameWorkspace: (wid: string, newName: string) => void;
  onAddTab: (wid: string) => void;
  onRenameTab: (wid: string, tabId: string, newName: string) => void;
}) {
  if (!workspace) return null;

  return (
    <div className="space-y-6">
      {/* Title row: New Item [edit btn] */}
      <div className="flex items-center gap-2">
        <input
          className="px-3 py-2 border border-slate-300 rounded-lg w-64"
          value={workspace.label}
          onChange={(e) => canEdit && onRenameWorkspace(wid, e.target.value)}
          disabled={!canEdit}
        />
      </div>

      {/* Tabs header */}
      <div className="flex items-center gap-3">
        {workspace.tabs.map((t) => (
          <div key={t.id} className="flex items-center gap-2">
            <input
              className="px-2 py-1 border border-slate-300 rounded-md w-40"
              value={t.name}
              onChange={(e) => canEdit && onRenameTab(wid, t.id, e.target.value)}
              disabled={!canEdit}
            />
          </div>
        ))}
        {canEdit && (
          <button
            onClick={() => onAddTab(wid)}
            className="px-3 py-1 rounded-md border border-cyan-300 text-cyan-700 hover:bg-cyan-50"
          >
            + Tab
          </button>
        )}
      </div>

      {/* Tab body placeholder */}
      <div className="text-slate-500">
        {workspace.tabs.length ? `${workspace.tabs[0].name} name` : "No tabs yet"}
      </div>

      {/* Add Module (keep same behavior as WebJourneyX list screen, but no cards here) */}
      <div>
        <button className="px-4 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-700">
          + Add Module
        </button>
      </div>
    </div>
  );
}


function HomeContent() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Welcome to Internal Work Management Systems (IWMS)</h1>
        <p className="text-lg text-slate-600">View the R&D Tools In Design and Maverick Project Progress</p>
      </div>
    </div>
  )
}

function DigiMindContent() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">DigiMind</h1>
        <p className="text-lg text-slate-600">
          Advanced digital intelligence platform combining user journey analytics, behavioral insights, and predictive
          modeling to optimize digital experiences and drive strategic decision-making across web and mobile platforms.
        </p>
      </div>
    </div>
  )
}

function WebJourneyXContent({ canEdit = true }) {
  const [activeTab, setActiveTab] = useState("")
  const [loadingcard, setLoadingcard] = useState(false)
  const [tabs, setTabs] = useState([])

  const [showAddModule, setShowAddModule] = useState(false)
  const [newModule, setNewModule] = useState({
    name: "",
    description: "",
    status: "Not yet started",
    hostedLink: "",
    tabName: "Test Tab"
  })

  const normalizeTabName = (tabName) => tabName.toLowerCase().replace(/\s+/g, "-")
  const currentTab = tabs.find((tab) => tab.id === activeTab)

  // Fetch modules on mount
  useEffect(() => {
    setLoadingcard(true)
    const fetchData = async () => {
      const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "")
      if (!base) return
      try {
        const response = await fetch(`${base}/api/resources/getwebjourneyx`)
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`)
        const data = await response.json()

        const groupedData = data.reduce((acc, module) => {
          const normalizedId = normalizeTabName(module.tab_name)
          if (!acc[normalizedId]) {
            acc[normalizedId] = { id: normalizedId, name: module.tab_name, modules: [] }
          }
          acc[normalizedId].modules.push({
            id: module.id,
            name: module.module_name,
            description: module.description,
            status: module.status,
            hostedLink: module.hostedlink
          })
          return acc
        }, {})

        const tabsArray = Object.values(groupedData)
        setTabs(tabsArray)

        // Set activeTab to first tab if none selected
        if (!activeTab && tabsArray.length > 0) {
          setActiveTab(tabsArray[0].id)
        }
        setLoadingcard(false)
      } catch (err) {
        console.error("Failed to fetch modules:", err)
        setLoadingcard(false)
      }
    }

    fetchData()
  }, [])

  const addModule = async () => {
    if (!canEdit || !newModule.name || !newModule.description) return

    const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "")
    if (!base) return

    try {
      const payload = {
        module_name: newModule.name,
        description: newModule.description,
        status: newModule.status,
        hostedlink: newModule.hostedLink,
        tab_name: newModule.tabName
      }

      const response = await fetch(`${base}/api/resources/setwebjourneyx`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      if (!response.ok) throw new Error("Failed to save module.")

      const savedModule = await response.json() // { module: {...} }
      const normalizedTabId = normalizeTabName(savedModule.module.tab_name)

      setTabs((prevTabs) => {
        const existingTab = prevTabs.find((tab) => tab.id === normalizedTabId)

        if (existingTab) {
          return prevTabs.map((tab) =>
            tab.id === normalizedTabId
              ? {
                  ...tab,
                  modules: [
                    ...tab.modules,
                    {
                      id: savedModule.module.id,
                      name: savedModule.module.module_name,
                      description: savedModule.module.description,
                      status: savedModule.module.status,
                      hostedLink: savedModule.module.hostedlink
                    }
                  ]
                }
              : tab
          )
        } else {
          // Add new tab
          return [
            ...prevTabs,
            {
              id: normalizedTabId,
              name: savedModule.module.tab_name,
              modules: [
                {
                  id: savedModule.module.id,
                  name: savedModule.module.module_name,
                  description: savedModule.module.description,
                  status: savedModule.module.status,
                  hostedLink: savedModule.module.hostedlink
                }
              ]
            }
          ]
        }
      })

      // Switch to new tab
      setActiveTab(normalizedTabId)
      setNewModule({ name: "", description: "", status: "Not yet started", hostedLink: "", tabName: "Test Tab" })
      setShowAddModule(false)
    } catch (err) {
      console.error("Error adding new module:", err)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Ongoing":
        return "bg-blue-100 text-blue-800"
      case "Not yet started":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">WebJourneyX</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === tab.id
                ? "text-cyan-600 border-b-2 border-cyan-600 bg-cyan-50"
                : "text-slate-600 hover:text-cyan-600 hover:bg-slate-50"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {loadingcard ? (
        <CSESkeleton />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">{currentTab?.name} Modules</h2>
            {canEdit && (
              <Button onClick={() => setShowAddModule(true)} className="bg-cyan-600 hover:bg-cyan-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Module
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentTab?.modules.map((module) => (
              <Card key={module.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-slate-900">{module.name}</h3>
                    <Badge className={getStatusColor(module.status)}>{module.status}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{module.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    {module.hostedLink ? (
                      <Button variant="outline" size="sm" asChild>
                        <a href={module.hostedLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Live
                        </a>
                      </Button>
                    ) : (
                      <span className="text-xs text-slate-400">No hosted link</span>
                    )}
                    {canEdit && (
                      <Button variant="ghost" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Add Module Modal */}
      {showAddModule && canEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Add New Module</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowAddModule(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Module Name</label>
                  <input
                    type="text"
                    value={newModule.name}
                    onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter module name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    value={newModule.description}
                    onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    rows={3}
                    placeholder="Enter module description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Development Status</label>
                  <select
                    value={newModule.status}
                    onChange={(e) => setNewModule({ ...newModule, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="Not yet started">Not yet started</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Hosted Link (Optional)</label>
                  <input
                    type="url"
                    value={newModule.hostedLink}
                    onChange={(e) => setNewModule({ ...newModule, hostedLink: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <Button onClick={addModule} className="flex-1 bg-cyan-600 hover:bg-cyan-700">
                  Add Module
                </Button>
                <Button variant="outline" onClick={() => setShowAddModule(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function EquimindContent() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Equimind</h1>
        <p className="text-lg text-slate-600">
          Intelligent financial analytics platform delivering real-time market data, predictive modeling, and
          comprehensive market intelligence for strategic investment decisions and portfolio optimization.
        </p>
      </div>
    </div>
  )
}

//csemarketintelligence
function MarketIndicatorsContent({ canEdit = true }) {
  const [activeTab, setActiveTab] = useState("company-insights")
  const [loadingcard, setLoadingcard] = useState(false)
  const [tabs, setTabs] = useState([
    // {
    //   id: "company-insights",
    //   name: "Company Insights",
    //   modules: [
    //     {
    //       id: 1,
    //       name: "Company CSE",
    //       description: "Real-time CSE company data and analytics",
    //       status: "Ongoing",
    //       hostedLink: "https://cse-analytics.com",
    //     },
    //     {
    //       id: 2,
    //       name: "SL Market Overview",
    //       description: "Sri Lankan market overview and trends",
    //       status: "Completed",
    //       hostedLink: "",
    //     },
    //   ],
    // },
    // {
    //   id: "marketplace",
    //   name: "Marketplace",
    //   modules: [
    //     {
    //       id: 3,
    //       name: "Trading Platform",
    //       description: "Integrated trading platform interface",
    //       status: "Not yet started",
    //       hostedLink: "",
    //     },
    //   ],
    // },
    // {
    //   id: "picks",
    //   name: "Picks",
    //   modules: [
    //     {
    //       id: 4,
    //       name: "AI Stock Picks",
    //       description: "AI-powered stock recommendations",
    //       status: "Ongoing",
    //       hostedLink: "https://ai-picks.com",
    //     },
    //   ],
    // },
  ])
  useEffect(() => {
    setLoadingcard(true)
    const fetchData = async () => {
      const base = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/,'')
      const url = `${base}/api/resources/getcsemarketintelligence`
      if (!base) return;

      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        setLoadingcard(false)
        const groupedData = data.reduce((acc, module) => {
          // Normalize the tab_name to a consistent format
          const normalizedTabName = module.tab_name.toLowerCase().replace(/\s/g, '-');
  
          // Check if a tab with this normalized name already exists
          if (!acc[normalizedTabName]) {
            acc[normalizedTabName] = {
              id: normalizedTabName, // Use the normalized string as the unique key
              name: module.tab_name, // Use the original name for display
              modules: [],
            };
          }
          
          // Push the module to the correct tab's modules array
          acc[normalizedTabName].modules.push({
            id: module.id,
            name: module.module_name,
            description: module.description,
            status: module.status,
            hostedLink: module.hostedlink,
          });
  
          return acc;
        }, {});
  
        setTabs(Object.values(groupedData));
        setLoadingcard(false)
      } catch (error) {
        console.error("Failed to fetch market data:", error);
        setLoadingcard(false)
      }
    };
  
    fetchData();
  }, []);

  const [showAddModule, setShowAddModule] = useState(false)
  const [newModule, setNewModule] = useState({
    name: "",
    description: "",
    status: "Not yet started",
    hostedLink: "",
  })

  const currentTab = tabs.find((tab) => tab.id === activeTab)

  const addModule = async () => {
    if (!canEdit) return
    if (!newModule.name || !newModule.description) {
        // You might want to add some user feedback here
        return
    }
    
    const base = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/,'')
    const url = `${base}/api/resources/setcsemarketintelligence`
    if (!base) return;
    try {
      const tabNameMap = {
        "company-insights": "Company Insights",
        "marketplace": "Marketplace",
        "picks": "Picks",
      };
      const payload = {
          module_name: newModule.name,
          description: newModule.description,
          status: newModule.status,
          hostedlink: newModule.hostedLink,
          tab_name: tabNameMap[activeTab] // You'll need to map this back to the correct tab name
      };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Failed to save module to the database.');
        }

        const savedModule = await response.json(); // Assuming the API returns the newly created item

        // Update the local state with the newly saved item
        const updatedTabs = tabs.map((tab) => {
            if (tab.id === activeTab) {
                return {
                    ...tab,
                    modules: [
                        ...tab.modules,
                        {
                          id: savedModule.module.id, // Use the unique ID from the API response
                          name: savedModule.module.module_name,
                          description: savedModule.module.description,
                          status: savedModule.module.status,
                          hostedLink: savedModule.module.hostedlink,
                        },
                    ],
                };
            }
            return tab;
        });
        setTabs(updatedTabs);

        // Reset the form and close the modal
        setNewModule({ name: "", description: "", status: "Not yet started", hostedLink: "" });
        setShowAddModule(false);

    } catch (error) {
        console.error("Error adding new module:", error);
        // Display an error message to the user
    }
};

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Ongoing":
        return "bg-blue-100 text-blue-800"
      case "Not yet started":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">CSE Market Intelligence</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === tab.id
                ? "text-cyan-600 border-b-2 border-cyan-600 bg-cyan-50"
                : "text-slate-600 hover:text-cyan-600 hover:bg-slate-50"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {
        loadingcard? <CSESkeleton/> :
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">{currentTab?.name} Modules</h2>
          {canEdit && (
            <Button onClick={() => setShowAddModule(true)} className="bg-cyan-600 hover:bg-cyan-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Module
            </Button>
          )}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentTab?.modules.map((module) => (
            <Card key={module.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-slate-900">{module.name}</h3>
                  <Badge className={getStatusColor(module.status)}>{module.status}</Badge>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">{module.description}</p>

                <div className="flex items-center justify-between pt-2">
                  {module.hostedLink ? (
                    <Button variant="outline" size="sm" asChild>
                      <a href={module.hostedLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View Live
                      </a>
                    </Button>
                  ) : (
                    <span className="text-xs text-slate-400">No hosted link</span>
                  )}

                  {canEdit && (
                    <Button variant="ghost" size="sm">
                      <Edit className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>}

      {/* Add Module Modal */}
      {showAddModule && canEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Add New Module</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowAddModule(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Module Name</label>
                  <input
                    type="text"
                    value={newModule.name}
                    onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter module name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    value={newModule.description}
                    onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    rows={3}
                    placeholder="Enter module description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Development Status</label>
                  <select
                    value={newModule.status}
                    onChange={(e) => setNewModule({ ...newModule, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="Not yet started">Not yet started</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Hosted Link (Optional)</label>
                  <input
                    type="url"
                    value={newModule.hostedLink}
                    onChange={(e) => setNewModule({ ...newModule, hostedLink: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <Button onClick={addModule} className="flex-1 bg-cyan-600 hover:bg-cyan-700">
                  Add Module
                </Button>
                <Button variant="outline" onClick={() => setShowAddModule(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MacroIndicatorsContent({ canEdit = true }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Srilankan Macro Intelligence</h1>
        <p className="text-lg text-slate-600">
          Comprehensive macroeconomic analysis platform providing real-time economic indicators, policy impact
          assessments, and predictive modeling for Sri Lankan market dynamics and investment strategies.
        </p>
      </div>
      {!canEdit && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-amber-800 text-sm">
            <Shield className="w-4 h-4 inline mr-1" />
            You have read-only access to this section.
          </p>
        </div>
      )}
    </div>
  )
}

function PropMindContent({ canEdit = true }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">propMind</h1>
        <p className="text-lg text-slate-600">
          Sri Lanka's Premier Real Estate Hub: Data-driven decisions, seamless transactions. Comprehensive property
          management platform with market analytics, transaction processing, and intelligent property recommendations.
        </p>
      </div>
      {!canEdit && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-amber-800 text-sm">
            <Shield className="w-4 h-4 inline mr-1" />
            You have read-only access to this section.
          </p>
        </div>
      )}
    </div>
  )
}

function ProjectPipelineContent({ canEdit = true }) {
  const [activeTab, setActiveTab] = useState<"ideahub" | "discovery" | "qualified" | "ongoing" | "completed">("ideahub")
  const [showAddProject, setShowAddProject] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [loading, setLoading] = useState(false)
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    engagementType: "In-House",
    priority: "Medium",
    status: "Active",
  })

  const [projects, setProjects] = useState<{
    ideahub: Array<{
      id: number;
      name: string;
      description: string;
      engagementType: string;
      priority: string;
      status: string;
    }>;
    discovery: Array<{
      id: number;
      name: string;
      description: string;
      engagementType: string;
      priority: string;
      status: string;
    }>;
    qualified: Array<{
      id: number;
      name: string;
      description: string;
      engagementType: string;
      priority: string;
      status: string;
    }>;
    ongoing: Array<{
      id: number;
      name: string;
      description: string;
      engagementType: string;
      priority: string;
      status: string;
      phase: string;
      version: string;
      dueDate: string;
    }>;
    completed: Array<{
      id: number;
      name: string;
      description: string;
      engagementType: string;
      priority: string;
      status: string;
      completedDate: string;
    }>;
  }>({
    ideahub: [
      // {
      //   id: 1,
      //   name: "AI Workforce - Financial Research",
      //   description:
      //     "Using this system, can you make me a window to engage with 2 agents (for now) Agent 1 - Financial Analyst for M&A Agent 2 - Corporate and Financial Crimes Investigator",
      //   engagementType: "In-House",
      //   priority: "High",
      //   status: "Active",
      // },
      // {
      //   id: 2,
      //   name: "Mavrick's KMS",
      //   description:
      //     "Buy/Sell Signal Indicator Development of a trading indicator that generates reliable buy/sell signals for our clients based on market trends and analytics.",
      //   engagementType: "Client Paid",
      //   priority: "Medium",
      //   status: "Pending",
      // },
    ],
    discovery: [
      // {
      //   id: 3,
      //   name: "Trading Portal MVP",
      //   description: "Comprehensive trading platform with real-time data and analytics",
      //   engagementType: "In-House",
      //   priority: "High",
      //   status: "Discovery Call",
      // },
    ],
    qualified: [
      // {
      //   id: 4,
      //   name: "CSE Insights Platform",
      //   description: "High level Management Dashboard - Positions, History, PNL, Winrate",
      //   engagementType: "Client Paid",
      //   priority: "Medium",
      //   status: "Qualified",
      // },
    ],
    ongoing: [
      // {
      //   id: 5,
      //   name: "WebJourneyX Enhancement",
      //   description: "Advanced user journey mapping with AI-powered insights",
      //   engagementType: "In-House",
      //   priority: "High",
      //   status: "Step 2",
      //   phase: "Front End Visual - Prioritized Scope",
      //   version: "V1",
      //   dueDate: "2024-02-15",
      // },
      // {
      //   id: 6,
      //   name: "propMind Analytics",
      //   description: "Real estate market analytics and prediction engine",
      //   engagementType: "Client Paid",
      //   priority: "Medium",
      //   status: "Step 3",
      //   phase: "Backend Mapping - Make Front End Functional",
      //   version: "V2",
      //   dueDate: "2024-03-01",
      // },
    ],
    completed: [
      // {
      //   id: 7,
      //   name: "Market Intelligence Dashboard",
      //   description: "Completed market intelligence platform with real-time data",
      //   engagementType: "In-House",
      //   priority: "High",
      //   status: "Completed",
      //   completedDate: "2024-01-20",
      // },
    ],
  })

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      try {
        const base = process.env.NEXT_PUBLIC_API_URL || "";
        const url = `${base}/api/resources/getprojectpipeline`;
        const res = await fetch(url);
        const data = await res.json();
        setProjects(data);
        setLoading(false)
      } catch (err) {
        console.error(err);
        setLoading(false)
      }
    };
  
    fetchProjects();
  }, []);
  
  // if (loading) {
  //   // Show skeleton while data is loading
  //   return <Loading />;
  // }

  const tabs: Array<{ id: "ideahub" | "discovery" | "qualified" | "ongoing" | "completed"; name: string; icon: string }> = [
    { id: "ideahub", name: "Ideahub", icon: "💡" },
    { id: "discovery", name: "In Discovery", icon: "🔍" },
    { id: "qualified", name: "Qualified", icon: "✅" },
    { id: "ongoing", name: "Ongoing", icon: "⚡" },
    { id: "completed", name: "Completed", icon: "🎉" },
  ]

  const addProject = async () => {
    if (!canEdit) return
    if (!newProject.name || !newProject.description) {
      // Optional: Add some UI feedback for validation
      return
    }
  
    const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "")
    if (!base) return
  
    const saveUrl = `${base}/api/resources/setprojectpipeline`
  
    try {
      // 1. Build payload in the shape your backend expects
      const projectPayload = {
        stage: activeTab, // ideahub, discovery, qualified, ongoing, completed
        item: {
          name: newProject.name,
          description: newProject.description,
          engagementType: newProject.engagementType,
          priority: newProject.priority,
          status: newProject.status,
          phase: activeTab === "ongoing" ? "Step 1" : null,
          version: activeTab === "ongoing" ? "V1" : null,
          dueDate: activeTab === "ongoing" ? "2024-12-31" : null,
          completedDate: activeTab === "completed" 
            ? new Date().toISOString().split("T")[0] 
            : null,
        },
      }
  
      // 2. Call backend
      const saveRes = await fetch(saveUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectPayload),
      })
  
      if (!saveRes.ok) {
        throw new Error("Failed to save project to backend")
      }
  
      const saved = await saveRes.json()
  
      // 3. Update local state with backend response
      const updatedProjects = { ...projects }
      updatedProjects[activeTab] = [
        ...updatedProjects[activeTab],
        {
          id: saved.project.id,
          name: saved.project.name,
          description: saved.project.description,
          engagementType: saved.project.engagementType,
          priority: saved.project.priority,
          status: saved.project.status,
          phase: saved.project.phase,
          version: saved.project.version,
          dueDate: saved.project.dueDate,
          completedDate: saved.project.completedDate,
        },
      ]
  
      setProjects(updatedProjects)
  
      // 4. Reset form + modal
      setNewProject({
        name: "",
        description: "",
        engagementType: "In-House",
        priority: "Medium",
        status: "Active",
      })
      setShowAddProject(false)
  
    } catch (error) {
      console.error("Error adding project:", error)
      // Optional: Show error toast/UI message
    }
  }
  
  
  

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Discovery Call":
        return "bg-blue-100 text-blue-800"
      case "Qualified":
        return "bg-purple-100 text-purple-800"
      case "Completed":
        return "bg-gray-100 text-gray-800"
      case "Step 1":
        return "bg-purple-100 text-purple-800"
      case "Step 2":
        return "bg-blue-100 text-blue-800"
      case "Step 3":
        return "bg-green-100 text-green-800"
      case "Step 4":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600"
      case "Medium":
        return "text-yellow-600"
      case "Low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getEngagementColor = (type: string) => {
    switch (type) {
      case "In-House":
        return "bg-green-100 text-green-800"
      case "Client Paid":
        return "bg-blue-100 text-blue-800"
      case "Collaboration":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderOngoingContent = () => {
    return (
      <div className="space-y-8">
        {/* Development Workflow Steps */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Development Workflow Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <div className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full mb-3 inline-block">
                Step 1
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Front End Visual</h4>
              <p className="text-sm text-slate-600">Product Vision</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-3 inline-block">
                Step 2
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Front End Visual</h4>
              <p className="text-sm text-slate-600">Prioritized Scope</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mb-3 inline-block">
                Step 3
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Backend Mapping</h4>
              <p className="text-sm text-slate-600">Make Front End Functional</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
              <div className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full mb-3 inline-block">
                Step 4
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Effort Estimate</h4>
              <p className="text-sm text-slate-600">Task List, Launch Timeline</p>
            </div>
          </div>
        </div>

        {/* Active Projects in Development */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Active Projects in Development</h3>
          <div className="space-y-4">
            {projects.ongoing.map((project) => (
              <div key={project.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-slate-900">{project.name}</h4>
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      <span className="text-sm text-slate-500">Due: {project.dueDate}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{project.phase}</p>
                    <p className="text-xs text-slate-500">Version: {project.version}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {canEdit && (
                      <>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderRegularContent = (boolean: loading) => {
    type ProjectItem = {
      id: number;
      name: string;
      description: string;
      engagementType: string;
      priority: string;
      status: string;
      completedDate?: string;
    }
    const currentProjects = (projects[activeTab] as ProjectItem[]) || []

    return (
      <>
      {
        loading ? <CardSkeleton/>:
        <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            {tabs.find((tab) => tab.id === activeTab)?.name} Projects
          </h2>
          {canEdit && (
            <Button onClick={() => setShowAddProject(true)} className="bg-cyan-600 hover:bg-cyan-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentProjects.map((project: ProjectItem) => (
            <Card key={project.id} className="p-6 hover:shadow-md transition-shadow min-h-[280px] flex flex-col">
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-slate-900 text-lg leading-tight">{project.name}</h3>
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed flex-1">{project.description}</p>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Engagement</span>
                    <Badge className={getEngagementColor(project.engagementType)}>{project.engagementType}</Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Priority</span>
                    <span className={`font-medium ${getPriorityColor(project.priority)}`}>{project.priority}</span>
                  </div>

                  {project.completedDate && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Completed</span>
                      <span className="text-slate-600">{project.completedDate}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Button variant="ghost" size="sm" className="text-slate-500">
                    <FileText className="w-3 h-3 mr-1" />
                    Pause
                  </Button>

                  <Button variant="outline" size="sm" className="text-cyan-600 hover:text-cyan-700 bg-transparent">
                    View Details
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      }
      </>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Project Pipeline</h1>
          <p className="text-slate-600">Monitor all your intelligent solutions</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          All Systems Online
        </Badge>
      </div>

      {!canEdit && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-amber-800 text-sm">
            <Shield className="w-4 h-4 inline mr-1" />
            You have read-only access to this section. Contact an administrator to create or edit projects.
          </p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === tab.id
                ? "text-cyan-600 border-b-2 border-cyan-600 bg-cyan-50"
                : "text-slate-600 hover:text-cyan-600 hover:bg-slate-50"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "ongoing" ? renderOngoingContent() : renderRegularContent(loading)}
      
      {/* Add Project Modal */}
      {showAddProject && canEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Add New Project</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowAddProject(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter project name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    rows={3}
                    placeholder="Enter project description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Engagement Type</label>
                  <select
                    value={newProject.engagementType}
                    onChange={(e) => setNewProject({ ...newProject, engagementType: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="In-House">In-House</option>
                    <option value="Client Paid">Client Paid</option>
                    <option value="Collaboration">Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                  <select
                    value={newProject.priority}
                    onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <Button onClick={addProject} className="flex-1 bg-cyan-600 hover:bg-cyan-700">
                  Add Project
                </Button>
                <Button variant="outline" onClick={() => setShowAddProject(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MeetingNotesContent({ canEdit = true }) {
  const [timeFilter, setTimeFilter] = useState("All Time")
  const [fileTypeFilter, setFileTypeFilter] = useState("All Documents")
  const [showAddDoc, setShowAddDoc] = useState(false)
  const [preview, setPreview] = useState<{ open: boolean; url: string; title: string }>({ open: false, url: "", title: "" })
  const [newDoc, setNewDoc] = useState({
    title: "",
    type: "Google Doc",
    sharedBy: "",
    date: new Date().toISOString().split("T")[0],
    source: "Google Docs",
    url: "",
  })
  const [loadingtable, setLoadingtable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Array<{
    id: number;
    title: string;
    type: string;
    sharedBy: string;
    date: string;
    source: string;
    url: string;
  }>>([
    // {
    //   id: 1,
    //   title: "Q4 Strategy Meeting Minutes",
    //   type: "Google Doc",
    //   sharedBy: "John Doe",
    //   date: "2025-01-15",
    //   source: "Google Docs",
    //   url: "#",
    // },
    // {
    //   id: 2,
    //   title: "Budget Analysis Spreadsheet",
    //   type: "Google Sheet",
    //   sharedBy: "Sarah Wilson",
    //   date: "2024-01-14",
    //   source: "Google Sheets",
    //   url: "#",
    // },
    // {
    //   id: 3,
    //   title: "Project Timeline & Milestones",
    //   type: "Google Doc",
    //   sharedBy: "Mike Chen",
    //   date: "2024-01-13",
    //   source: "Google Docs",
    //   url: "#",
    // },
  ])
  const base = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/,'')
  const url = `${base}/api/resources/getmeetingminutes`
  useEffect(() => {
    setLoadingtable(true)
    fetch(url)
    .then((res) => {
      console.log("Response status:", res.status);
      return res.text(); // read as text first
    })
    .then((text) => {
      console.log("Raw response:", text);
      try {
        const data = JSON.parse(text);
        setDocuments(data);
        setLoadingtable(false)
      } catch (err) {
        console.error("Response was not valid JSON", err);
        setLoadingtable(false)
      }
    })
    .catch((err) => console.error(err));  
  }, []);
  

  // const filteredDocuments = documents.filter((doc) => {
  //   const matchesType = fileTypeFilter === "All Documents" || doc.type === fileTypeFilter
  //   // For demo purposes, time filter is not altering results; extend when backend exists
  //   const matchesTime = timeFilter === "All Time"
  //   return matchesType && matchesTime
  // })

  const filteredDocuments = documents.filter((doc) => {
    const matchesType =
      fileTypeFilter === "All Documents" || doc.type === fileTypeFilter;
  
    const docDate = new Date(doc.date);
    const now = new Date();
  
    let matchesTime = false;
    if (timeFilter === "All Time") {
      matchesTime = true;
    } else if (timeFilter === "This Month") {
      matchesTime =
        docDate.getMonth() === now.getMonth() &&
        docDate.getFullYear() === now.getFullYear();
    } else if (timeFilter === "Last 3 Months") {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      matchesTime = docDate >= threeMonthsAgo && docDate <= now;
    } else if (timeFilter === "This Year") {
      matchesTime = docDate.getFullYear() === now.getFullYear();
    }
  
    return matchesType && matchesTime;
  });
  

  const addDocument = async () => {
    if (!canEdit) return
    if (!newDoc.title || !newDoc.url) return
  
    try {
      const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "")
      const url = `${base}/api/resources/setmeetingminutes`
  
      // Call backend to save
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDoc),
      })
  
      if (!res.ok) throw new Error("Failed to save document")
  
      const data = await res.json()
  
      // Update UI with backend response
      setDocuments((prev) => [
        data.document,  // the one returned from backend (with id)
        ...prev,
      ])
  
      setShowAddDoc(false)
      setNewDoc({
        title: "",
        type: "Google Doc",
        sharedBy: "",
        date: new Date().toISOString().split("T")[0],
        source: "Google Docs",
        url: "",
      })
    } catch (err) {
      console.error("Error saving document:", err)
    }
  }
  

  const getTypeBadge = (type: string) => {
    const styles = type === "Google Sheet" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-sky-50 text-sky-700 border-sky-200"
    return <Badge variant="outline" className={styles}>{type}</Badge>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Meeting Minutes and Notes</h1>
        <p className="text-slate-600">Shared Google Docs and Sheets from team discussions and meetings.</p>
      </div>

      {!canEdit && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-amber-800 text-sm">
            <Shield className="w-4 h-4 inline mr-1" />
            You have read-only access to this section.
          </p>
        </div>
      )}

      <Card className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex gap-3 flex-1">
            <div className="flex-1 min-w-[180px]">
              <label className="block text-xs font-medium text-slate-600 mb-1">Time Filter</label>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option>All Time</option>
                <option>This Month</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="flex-1 min-w-[180px]">
              <label className="block text-xs font-medium text-slate-600 mb-1">File Type</label>
              <select
                value={fileTypeFilter}
                onChange={(e) => setFileTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option>All Documents</option>
                <option>Google Doc</option>
                <option>Google Sheet</option>
              </select>
            </div>
          </div>

          {canEdit && (
            <Button onClick={() => setShowAddDoc(true)} className="bg-cyan-600 hover:bg-cyan-700">
              <Plus className="w-4 h-4 mr-2" /> Add Google Doc Link
            </Button>
          )}
        </div>

        <div className="mt-6 overflow-x-auto">
          {
            loadingtable 
            ? 
            <TableSkeleton/>
            :
            <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600 border-b border-slate-200">
                <th className="py-3 pr-4">Document</th>
                <th className="py-3 pr-4">Type</th>
                <th className="py-3 pr-4">Shared By</th>
                <th className="py-3 pr-4">Date</th>
                <th className="py-3 pr-4">Source</th>
                <th className="py-3 pr-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="border-b last:border-0 border-slate-100">
                  <td className="py-4 pr-4">
                    <a className="text-cyan-700 font-medium hover:underline" href={doc.url} target="_blank" rel="noreferrer">
                      {doc.title}
                    </a>
                  </td>
                  <td className="py-4 pr-4">{getTypeBadge(doc.type)}</td>
                  <td className="py-4 pr-4 text-slate-700">{doc.sharedBy}</td>
                  <td className="py-4 pr-4 text-slate-600">{doc.date}</td>
                  <td className="py-4 pr-4 text-slate-700">{doc.source}</td>
                  <td className="py-4 pr-2">
                    <div className="flex items-center justify-end gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-cyan-600 px-2"
                        onClick={() => setPreview({ open: true, url: doc.url, title: doc.title })}
                      >
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" asChild className="bg-transparent">
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                          Open <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          }
        </div>
      </Card>

      {showAddDoc && canEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Add Google Doc/Sheet</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowAddDoc(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newDoc.title}
                    onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Document title"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                    <select
                      value={newDoc.type}
                      onChange={(e) => setNewDoc({ ...newDoc, type: e.target.value, source: e.target.value === "Google Sheet" ? "Google Sheets" : "Google Docs" })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      <option>Google Doc</option>
                      <option>Google Sheet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={newDoc.date}
                      onChange={(e) => setNewDoc({ ...newDoc, date: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Shared By</label>
                    <input
                      type="text"
                      value={newDoc.sharedBy}
                      onChange={(e) => setNewDoc({ ...newDoc, sharedBy: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Google Link</label>
                    <input
                      type="url"
                      value={newDoc.url}
                      onChange={(e) => setNewDoc({ ...newDoc, url: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="https://docs.google.com/..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <Button onClick={addDocument} className="flex-1 bg-cyan-600 hover:bg-cyan-700">Add Link</Button>
                <Button variant="outline" onClick={() => setShowAddDoc(false)} className="flex-1">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {preview.open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setPreview({ open: false, url: "", title: "" })}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
              <h3 className="text-sm md:text-base font-semibold text-slate-900 truncate pr-4">{preview.title}</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild className="bg-transparent">
                  <a href={preview.url} target="_blank" rel="noopener noreferrer">
                    Open in new tab <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setPreview({ open: false, url: "", title: "" })}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="w-full h-[70vh] bg-slate-50">
              <iframe
                title={preview.title}
                src={preview.url}
                className="w-full h-full"
                loading="lazy"
                allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function KnowledgeManagementContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Knowledge Management System</h1>
      <p className="text-lg text-slate-600">
        Centralized knowledge repository with document management, meeting minutes, and collaborative workspace integration.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Meeting Minutes</h2>
          <p className="text-sm text-slate-600">Access and manage meeting documentation and action items</p>
          <Button variant="link" className="mt-4">
            View Minutes →
          </Button>
        </Card>
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Document Library</h2>
          <p className="text-sm text-slate-600">Centralized document storage and version control</p>
          <Button variant="link" className="mt-4">
            Browse Documents →
          </Button>
        </Card>
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Collaborative Workspace</h2>
          <p className="text-sm text-slate-600">Shared workspace for team collaboration and knowledge sharing</p>
          <Button variant="link" className="mt-4">
            Open Workspace →
          </Button>
        </Card>
      </div>
    </div>
  )
}

function CommChannelsContent({ canEdit = true }) {
  const [activeTab, setActiveTab] = useState("whatsapp")

  const tabs = [
    { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
    { id: "slack", label: "Slack", icon: Hash },
    { id: "email", label: "Email", icon: Mail },
    { id: "teams", label: "Microsoft Teams", icon: Users },
    { id: "discord", label: "Discord", icon: MessageCircle },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "whatsapp":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center mb-4">
                <MessageSquare className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">WhatsApp Business API</h3>
                  <p className="text-sm text-slate-600">Customer communication and automated messaging</p>
                </div>
                <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Connected</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900">1,247</div>
                  <div className="text-sm text-slate-600">Active Chats</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900">89%</div>
                  <div className="text-sm text-slate-600">Response Rate</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900">2.3s</div>
                  <div className="text-sm text-slate-600">Avg Response Time</div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Extracted Links Section */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                    <Link className="w-4 h-4 mr-2" />
                    Shared Links & Resources
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white rounded p-3 border border-blue-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Youtube className="w-4 h-4 text-red-600" />
                            <span className="text-sm font-medium">YouTube Video</span>
                          </div>
                          <p className="text-sm text-slate-700 mb-2">AI Development Best Practices 2024</p>
                          <a href="#" className="text-xs text-blue-600 hover:underline">
                            https://youtube.com/watch?v=abc123
                          </a>
                        </div>
                        <div className="text-right text-xs text-slate-500">
                          <div>Shared by: John Doe</div>
                          <div>2 hours ago</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded p-3 border border-blue-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <FileText className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium">Document</span>
                          </div>
                          <p className="text-sm text-slate-700 mb-2">Project Requirements Specification</p>
                          <a href="#" className="text-xs text-blue-600 hover:underline">
                            https://docs.google.com/document/d/xyz789
                          </a>
                        </div>
                        <div className="text-right text-xs text-slate-500">
                          <div>Shared by: Sarah Chen</div>
                          <div>1 day ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Discussion Notes Section */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Key Discussion Points
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white rounded p-3 border border-green-200">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                          JD
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium">John Doe</span>
                            <span className="text-xs text-slate-500">initiated discussion</span>
                          </div>
                          <p className="text-sm text-slate-700">
                            "We need to prioritize the API integration for the Q1 release. The client feedback suggests
                            this is critical for user adoption."
                          </p>
                          <div className="text-xs text-slate-500 mt-1">3 hours ago • 5 replies</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded p-3 border border-green-200">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                          SC
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium">Sarah Chen</span>
                            <span className="text-xs text-slate-500">shared insights</span>
                          </div>
                          <p className="text-sm text-slate-700">
                            "Based on the market research, we should also consider mobile-first approach. 70% of our
                            target users access via mobile."
                          </p>
                          <div className="text-xs text-slate-500 mt-1">1 day ago • 8 replies</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Participants Section */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Active Participants (Last 24h)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3 border border-purple-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          JD
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">John Doe</div>
                          <div className="text-xs text-slate-500">15 messages • 3 links shared</div>
                        </div>
                        <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Most Active</div>
                      </div>
                    </div>
                    <div className="bg-white rounded p-3 border border-purple-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          SC
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">Sarah Chen</div>
                          <div className="text-xs text-slate-500">12 messages • 2 documents shared</div>
                        </div>
                        <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Top Contributor</div>
                      </div>
                    </div>
                    <div className="bg-white rounded p-3 border border-purple-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          MK
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">Mike Kumar</div>
                          <div className="text-xs text-slate-500">8 messages • 1 video shared</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded p-3 border border-purple-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          AL
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">Anna Lee</div>
                          <div className="text-xs text-slate-500">6 messages • 4 reactions</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "slack":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center mb-4">
                <Hash className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Slack Workspace</h3>
                  <p className="text-sm text-slate-600">Team collaboration and project notifications</p>
                </div>
                <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Connected</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900">12</div>
                  <div className="text-sm text-slate-600">Active Channels</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900">45</div>
                  <div className="text-sm text-slate-600">Team Members</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900">324</div>
                  <div className="text-sm text-slate-600">Messages Today</div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Channel Highlights */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                    <Hash className="w-4 h-4 mr-2" />
                    Channel Highlights
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white rounded p-3 border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">#general</span>
                        <span className="text-xs text-slate-500">45 messages today</span>
                      </div>
                      <p className="text-sm text-slate-700">Team standup updates and project announcements</p>
                    </div>
                    <div className="bg-white rounded p-3 border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">#development</span>
                        <span className="text-xs text-slate-500">28 messages today</span>
                      </div>
                      <p className="text-sm text-slate-700">Code reviews and technical discussions</p>
                    </div>
                  </div>
                </div>

                {/* Shared Resources */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Recent Shared Resources
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white rounded p-3 border border-blue-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-slate-700 mb-1">Sprint Planning Template</p>
                          <a href="#" className="text-xs text-blue-600 hover:underline">
                            https://notion.so/sprint-template
                          </a>
                        </div>
                        <div className="text-right text-xs text-slate-500">
                          <div>@mike.kumar</div>
                          <div>4 hours ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "email":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center mb-4">
                <Mail className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Email Integration</h3>
                  <p className="text-sm text-slate-600">Automated workflows and notifications</p>
                </div>
                <span className="ml-auto text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Setup Required</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900">0</div>
                  <div className="text-sm text-slate-600">Emails Sent</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900">0%</div>
                  <div className="text-sm text-slate-600">Open Rate</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900">0</div>
                  <div className="text-sm text-slate-600">Active Campaigns</div>
                </div>
              </div>
            </div>
          </div>
        )
      case "teams":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Microsoft Teams</h3>
                  <p className="text-sm text-slate-600">Enterprise collaboration and meetings</p>
                </div>
                <span className="ml-auto text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Not Connected</span>
              </div>
            </div>
          </div>
        )
      case "discord":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center mb-4">
                <MessageCircle className="w-8 h-8 text-indigo-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Discord Server</h3>
                  <p className="text-sm text-slate-600">Community management and real-time chat</p>
                </div>
                <span className="ml-auto text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Not Connected</span>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Communication Channel Integration</h1>
        <p className="text-lg text-slate-600">
          Centralized communication hub integrating multiple messaging platforms and collaboration tools.
        </p>
      </div>

      {!canEdit && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-amber-800 text-sm">
            <Shield className="w-4 h-4 inline mr-1" />
            You have read-only access to this section. Contact an administrator to configure integrations.
          </p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-cyan-500 text-cyan-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>{renderTabContent()}</div>
    </div>
  )
}
