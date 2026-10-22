import Auth from "./pages/Auth";
import { io } from "socket.io-client";
import { useEffect, useMemo, useRef, useState } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronDown,
  CircleHelp,
  Clock3,
  Command,
  FileText,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
  Trash2
} from "lucide-react";
import "./App.css";
const API_URL = import.meta.env.VITE_API_URL;



function Brand({ compact = false }) {
  return (
    <Link to="/" className="brand" aria-label="WorkSync home">
      <span className="brand-mark"><Command size={21} strokeWidth={2.5} /></span>
      {!compact && <span>Work<span className="brand-light">Sync</span></span>}
    </Link>
  );
}

function Avatar({ initials, color = "avatar-purple", small = false }) {
  return (
    <span className={`avatar ${color} ${small ? "avatar-small" : ""}`}>
      {initials}
    </span>
  );
}

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <header className="landing-nav container">
        <Brand />
        <nav className="landing-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#about">About</a>
        </nav>
        <div className="nav-actions">
          <button className="btn-ghost" onClick={() => navigate("/login")}>
           Log in
          </button>
          <button className="btn-primary nav-cta" onClick={() => navigate("/signup")}>
            Get started <ArrowRight size={16} />
          </button>
        </div>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-copy">
            <div className="eyebrow">
              <Sparkles size={14} />
              <span>YOUR TEAM, IN SYNC</span>
              <span className="eyebrow-dot" />
              <span>MADE FOR TEAMS</span>
            </div>

            <h1>
              Great work happens
              <br />
              when teams <span className="gradient-text">sync.</span>
            </h1>

            <p className="hero-description">
              Bring projects, tasks and conversations together in one
              focused workspace. Less switching, more meaningful work.
            </p>

            <div className="hero-actions">
              <button className="btn-primary btn-large" onClick={() => navigate("/signup")}>
                Explore workspace <ArrowRight size={18} />
              </button>
              <a className="btn-video" href="#how-it-works">
                <span className="play-icon">▶</span> See how it works
              </a>
            </div>

            <div className="hero-proof">
              <div className="avatar-stack">
                <Avatar initials="AS" color="avatar-purple" small />
                <Avatar initials="RK" color="avatar-blue" small />
                <Avatar initials="NS" color="avatar-pink" small />
                <Avatar initials="AM" color="avatar-green" small />
              </div>
              <div>
                <div className="proof-stars">★★★★★</div>
                <p>Built for teams that get things done</p>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-glow" />
            <div className="floating-chip chip-top"><span className="chip-icon green-icon"><Check size={14} /></span> Task completed <span className="chip-time">just now</span></div>
            <div className="preview-window">
              <div className="preview-topbar">
                <div className="window-dots"><i /><i /><i /></div>
                <span>worksync.app</span>
                <MoreHorizontal size={17} />
              </div>
              <div className="preview-content">
                <aside className="preview-sidebar">
                  <Brand compact />
                  <div className="preview-nav active"><LayoutDashboard size={13} /> Overview</div>
                  <div className="preview-nav"><FolderKanban size={13} /> Projects</div>
                  <div className="preview-nav"><ListTodo size={13} /> My tasks</div>
                  <div className="preview-nav"><MessageCircle size={13} /> Messages</div>
                  <div className="preview-workspace">WORKSPACE</div>
                  <div className="preview-project"><i className="project-dot purple-dot" /> Website</div>
                  <div className="preview-project"><i className="project-dot blue-dot" /> Mobile app</div>
                </aside>
                <div className="preview-main">
                  <div className="preview-greeting">Good morning, Neha 👋</div>
                  <div className="preview-subtitle">Here's what's happening today.</div>
                  <div className="preview-stats">
                    <div><span>Active projects</span><strong>08 <small>↗ 12%</small></strong></div>
                    <div><span>Tasks completed</span><strong>24 <small>↗ 8%</small></strong></div>
                  </div>
                  <div className="preview-section-title">Your projects <span>View all →</span></div>
                  <div className="preview-project-card">
                    <div className="preview-card-top"><i className="project-dot purple-dot" /><b>Website Redesign</b><span>72%</span></div>
                    <div className="mini-progress"><i style={{ width: "72%" }} /></div>
                    <div className="preview-card-foot"><span>18 of 25 tasks</span><span>Oct 22</span></div>
                  </div>
                  <div className="preview-project-card">
                    <div className="preview-card-top"><i className="project-dot blue-dot" /><b>Mobile Application</b><span>48%</span></div>
                    <div className="mini-progress blue-progress"><i style={{ width: "48%" }} /></div>
                    <div className="preview-card-foot"><span>12 of 25 tasks</span><span>Oct 28</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="floating-chip chip-bottom"><span className="chip-icon purple-icon"><MessageCircle size={14} /></span> Team is collaborating <span className="online-dot" /></div>
          </div>
        </section>

        <section className="trust-strip container" id="about">
          <p>A SHARED SPACE FOR YOUR TEAM'S BEST WORK</p>
          <div className="trust-items">
            <span><Zap size={17} /> Plan with purpose</span>
            <span><Users size={17} /> Work together</span>
            <span><ShieldCheck size={17} /> Stay in control</span>
            <span><CheckCheck size={17} /> Deliver on time</span>
          </div>
        </section>

        <section className="features-section section-pad" id="features">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">ONE WORKSPACE. MORE MOMENTUM.</span>
              <h2>Everything your team needs.<br /><span className="gradient-text">Nothing in your way.</span></h2>
              <p>Keep the moving parts of your work connected, from the first idea to the final delivery.</p>
            </div>
            <div className="feature-grid">
              <article className="feature-card">
                <div className="feature-icon purple-feature"><FolderKanban size={23} /></div>
                <h3>Projects that stay on track</h3>
                <p>See progress, deadlines and ownership at a glance. Everyone knows what matters next.</p>
                <span className="feature-link">Organize your work <ArrowRight size={15} /></span>
              </article>
              <article className="feature-card">
                <div className="feature-icon blue-feature"><ListTodo size={23} /></div>
                <h3>Tasks with clear ownership</h3>
                <p>Turn big goals into manageable steps and keep priorities visible for the whole team.</p>
                <span className="feature-link">Make progress visible <ArrowRight size={15} /></span>
              </article>
              <article className="feature-card">
                <div className="feature-icon green-feature"><MessageCircle size={23} /></div>
                <h3>Conversations in context</h3>
                <p>Bring discussions closer to the work so important updates don't get lost in the noise.</p>
                <span className="feature-link">Keep everyone connected <ArrowRight size={15} /></span>
              </article>
            </div>
          </div>
        </section>

        <section className="workflow-section section-pad" id="how-it-works">
          <div className="container workflow-layout">
            <div>
              <span className="section-kicker">A CLEARER WAY TO COLLABORATE</span>
              <h2>From scattered tasks<br />to <span className="gradient-text">shared progress.</span></h2>
              <p className="workflow-copy">WorkSync gives your team a simple rhythm: plan the work, move it forward, and celebrate what's done.</p>
              <button className="btn-primary" onClick={() => navigate("/dashboard")}>Open the workspace <ArrowRight size={16} /></button>
            </div>
            <div className="workflow-steps">
              <div className="workflow-step"><span>01</span><div><h3>Bring work together</h3><p>Create projects and give every goal a home.</p></div><FolderKanban /></div>
              <div className="workflow-step"><span>02</span><div><h3>Make the next step clear</h3><p>Assign tasks, set priorities and track progress.</p></div><ListTodo /></div>
              <div className="workflow-step"><span>03</span><div><h3>Move forward as a team</h3><p>Share updates and keep everyone aligned.</p></div><Users /></div>
            </div>
          </div>
        </section>

        <section className="final-cta container">
          <div className="cta-orb" />
          <span className="section-kicker">YOUR NEXT CHAPTER STARTS HERE</span>
          <h2>Make teamwork feel<br /><span className="gradient-text">a little more effortless.</span></h2>
          <p>Bring your projects and people into one shared space.</p>
          <button className="btn-primary btn-large" onClick={() => navigate("/dashboard")}>Get started with WorkSync <ArrowRight size={18} /></button>
        </section>
      </main>

      <footer className="landing-footer container">
        <Brand />
        <p>Thoughtful teamwork starts here.</p>
        <span>© 2026 WorkSync · Built for better collaboration</span>
      </footer>
    </div>
  );
}

function Sidebar({ active, setActive, mobileOpen, setMobileOpen,  projectList, unreadMessageCount = 0 }) {
  const navigate = useNavigate();

  const links = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Projects", icon: FolderKanban },
    { label: "My Tasks", icon: ListTodo },
    { label: "Team", icon: Users },
    { label: "Messages", icon: MessageCircle, badge: unreadMessageCount},
  ];

  function goTo(label) {
    setActive(label);
    setMobileOpen(false);
    if (label === "Overview") navigate("/dashboard");
  }

  return (
    <>
      {mobileOpen && <button className="mobile-scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <aside className={`app-sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand-row">
          <Brand />
          <button className="icon-btn sidebar-close" onClick={() => setMobileOpen(false)} aria-label="Close sidebar"><X size={19} /></button>
        </div>

        <button className="workspace-switcher">
          <span className="workspace-symbol">W</span>
          <span className="workspace-name"><b>Workspace</b><small>Personal team</small></span>
          <ChevronDown size={15} />
        </button>

        <div className="sidebar-label">WORKSPACE</div>
        <nav className="sidebar-links">
          {links.map(({ label, icon: Icon, badge }) => (
            <button
              key={label}
              className={`sidebar-link ${active === label ? "sidebar-link-active" : ""}`}
              onClick={() => goTo(label)}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {label === "Messages" && unreadMessageCount > 0 && (
  <span className="sidebar-badge">{unreadMessageCount}</span>
)}
            </button>
          ))}
        </nav>

        <div className="sidebar-label projects-label">YOUR PROJECTS <button className="tiny-plus" aria-label="Add project" onClick={() => setActive("Projects")}><Plus size={15} /></button></div>
        <div className="sidebar-project-links">
          
{projectList.map((project) => (
  <button
    key={project._id}
    className="sidebar-project-link"
    onClick={() => {
      setActive("Projects");
      setMobileOpen(false);
    }}
  >
    <i
      className={`project-dot ${
        project.color || "purple"
      }-dot`}
    />
    {project.name}
  </button>
))}

        </div>

        <div className="sidebar-bottom">
          <div className="help-card"><span className="help-icon"><CircleHelp size={17} /></span><div><b>Need a hand?</b><small>Visit our help center</small></div><ArrowUpRight size={15} /></div>
          <button className="sidebar-link" onClick={() => setActive("Settings")}><Settings size={18} /><span>Settings</span></button>
          
<div className="sidebar-profile">
  {(() => {
    const user = JSON.parse(
      sessionStorage.getItem("worksyncUser") || "{}"
    );
    const name = user.name || user.fullName || user.username || "User";
    const initials = name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

    return (
      <>
        <Avatar initials={initials} color="avatar-pink" />
        <div className="profile-info">
          <b>{name}</b>
          <small>Free workspace</small>
        </div>
      </>
    );
  })()}
  <button className="icon-btn" aria-label="Profile menu">
    <MoreHorizontal size={19} />
  </button>
</div>

        </div>
      </aside>
    </>
  );
}

function StatCard({ icon: Icon, label, value, change, color, note, down }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span className={`stat-icon ${color}`}><Icon size={19} /></span>
        <button className="icon-btn" aria-label={`${label} options`}><MoreHorizontal size={19} /></button>
      </div>
      <p className="stat-label">{label}</p>
      <div className="stat-value-row"><strong>{value}</strong><span className={`stat-change ${down ? "change-down" : ""}`}>{down ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}{change}</span></div>
      <p className="stat-note">{note}</p>
    </article>
  );
}


function ProjectCard({ project, onDelete, onManageMembers, isOwner}) {
  return (
    <article className="project-card">
      <div className="project-card-header">
        <span className={`project-symbol ${project.color}`}>
          <FolderKanban size={19} />
        </span>

        {isOwner && (
          <button
          className="icon-btn"
          aria-label={`Delete ${project.name}`}
          title="Delete project"
          onClick={() => onDelete(project.id)}
        >
          <Trash2 size={18} />
        </button>
      )}
      </div>

      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <p>{project.members.length} members</p>

      <div className="project-tracked-time">
  <Clock3 size={15} />
  <span>Time tracked: {project.trackedTime || "0h 0m"}</span>
</div>

      <div className="project-progress-heading">
        <span>Progress</span>
        <b>{project.progress}%</b>
      </div>

      <div className={`progress-track ${project.color}-track`}>
        <span style={{ width: `${project.progress}%` }} />
      </div>
      
{isOwner && (
  <button
  className="btn-outline"
  onClick={() => onManageMembers(project)}
>
  <Users size={16} /> Manage Members
</button>
)}


      <div className="project-card-footer">
        <div className="avatar-stack project-avatars">
          {project.members.map((member, index) => (
            <Avatar
              key={member}
              initials={member}
              color={["avatar-purple", "avatar-blue", "avatar-pink"][index]}
              small
            />
          ))}
        </div>

        <span>
          {project.done}/{project.total} tasks
        </span>

        <span className="project-due">
          <CalendarDays size={13} /> {project.due}
        </span>
      </div>
    </article>
  );
}

function TaskTable({ tasks, onToggle, onDelete, onTimer }) {
  return (
    <div className="task-table-wrap">
      <table className="task-table">
        
      <thead>
       <tr>
         <th>TASK NAME</th>
         <th>PROJECT</th>
         <th>ASSIGNED TO</th>
         <th>PRIORITY</th>
         <th>STATUS</th>
         <th>Timer</th>
         <th>DUE</th>
         <th>ACTION</th>
       </tr>
      </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td><button className={`task-check ${task.status === "Done" ? "task-checked" : ""}`} aria-label={`Mark ${task.title} ${task.status === "Done" ? "incomplete" : "complete"}`} onClick={() => onToggle(task.id)}>{task.status === "Done" && <Check size={12} />}</button><span className={task.status === "Done" ? "task-done" : ""}>{task.title}</span></td>
              <td><span className="task-project">{task.project}</span></td>
              <td>
                <span className="task-project">
                     {task.assignedTo?.name ||
                     task.assignedTo?.email ||
                     "Unassigned"}
                 </span>
             </td>
              <td><span className={`priority priority-${task.priority.toLowerCase()}`}><i />{task.priority}</span></td>
              
<td>
  <select
    className={`status-select status-${task.status
      .toLowerCase()
      .replace(" ", "-")}`}
    value={task.status}
    onChange={(e) => onToggle(task.id, e.target.value)}
    aria-label={`Change status of ${task.title}`}
  >
    <option value="To do">To do</option>
    <option value="In progress">In progress</option>
    <option value="Done">Done</option>
  </select>
</td>

<td>
  <button
    type="button"
    className="timer-button"
    disabled={task.status === "Done"}
    onClick={() => onTimer(task)}
  >
    {task.timerStartedAt ? "Stop Timer" : "Start Timer"}
  </button>
</td>

              <td className="task-date">{task.date}</td>
              
              <td>
               <button
                  type="button"
                  className="btn-outline"
                  onClick={() => onDelete(task.id)}
                  aria-label={`Delete ${task.title}`}
                 >
                <X size={14} />
                Delete
               </button>
              </td>

            </tr>
          ))}
          {tasks.length === 0 && <tr><td colSpan="8" className="empty-tasks">No tasks match your search.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function Dashboard() {
  const [active, setActive] = useState("Overview");
  const [chatProjectId, setChatProjectId] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatText, setChatText] = useState("");
  const [chatStatus, setChatStatus] = useState("Select a project");
  const chatSocketRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const shouldAutoScrollRef = useRef(true);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const totalTrackedSeconds = tasks.reduce((total, task) => {
  const savedSeconds = Number(task.trackedSeconds || 0);

  const runningSeconds = task.timerStartedAt
    ? Math.max(
        0,
        Math.floor(
          (Date.now() - new Date(task.timerStartedAt).getTime()) / 1000
        )
      )
    : 0;

  return total + savedSeconds + runningSeconds;
}, 0);

const trackedHours = Math.floor(totalTrackedSeconds / 3600);
const trackedMinutes = Math.floor((totalTrackedSeconds % 3600) / 60);

const hoursTrackedLabel = `${trackedHours}h ${trackedMinutes}m`;
  const [projectList, setProjectList] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const projectTrackedTime = projectList.map((project) => {
  const projectId = project._id || project.id;

  const projectTasks = tasks.filter((task) => {
    const taskProjectId =
      task.projectId?._id || task.projectId || task.project?._id;

    return taskProjectId?.toString() === projectId?.toString();
  });

  const totalSeconds = projectTasks.reduce((total, task) => {
    const savedSeconds = Number(task.trackedSeconds || 0);

    const runningSeconds = task.timerStartedAt
      ? Math.max(
          0,
          Math.floor(
            (Date.now() - new Date(task.timerStartedAt).getTime()) / 1000
          )
        )
      : 0;

    return total + savedSeconds + runningSeconds;
  }, 0);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return {
    projectId,
    projectName: project.name || project.title,
    trackedTime: `${hours}h ${minutes}m`,
    totalSeconds,
  };
});
  const [showAddProject, setShowAddProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [memberEmail, setMemberEmail] = useState("");
  const [memberMessage, setMemberMessage] = useState("");
  const [memberLoading, setMemberLoading] = useState(false);
  const [memberResults, setMemberResults] = useState([]);
  const [addingMember, setAddingMember] = useState(false);
  const [projectMembers, setProjectMembers] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [newProjectColor, setNewProjectColor] = useState("purple");
  const [newProjectDate, setNewProjectDate] = useState("");
  const [tasksLoading, setTasksLoading] = useState(true);
  const [filter, setFilter] = useState("All tasks");
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const unreadNotificationsCount = notifications.filter(
     (notification) => !notification.isRead
     ).length;
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [newTaskProjectId, setNewTaskProjectId] = useState("");
  const [newTaskAssigneeId, setNewTaskAssigneeId] = useState("");
  const [toast, setToast] = useState("");
  
const [userName, setUserName] = useState(() => {
  try {
    const user = JSON.parse(
      sessionStorage.getItem("worksyncUser") || "null"
    );

    return user?.name || user?.fullName || user?.username || "User";
  } catch {
    return "User";
  }
});

  const navigate = useNavigate();
  
useEffect(() => {
  let cancelled = false;

  async function loadTasks() {
    const token = sessionStorage.getItem("worksyncToken");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const response = await fetch("https://worksync-891n.onrender.com/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        sessionStorage.removeItem("worksyncToken");
        sessionStorage.removeItem("worksyncUser");
        navigate("/login", { replace: true });
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load tasks.");
      }
      console.table(
  data.tasks.map((task) => ({
    title: task.title,
    project: task.project,
    projectId: task.projectId?._id || task.projectId || null,
    status: task.status,
    date: task.date,
  }))
);
      if (!cancelled) {
        setTasks(
          data.tasks.map((task) => ({
            ...task,
            id: task._id,
          }))
        );
      }
    } catch (error) {
      if (!cancelled) {
        setToast(error.message || "The task couldn't be loaded.");
      }
    } finally {
      if (!cancelled) {
        setTasksLoading(false);
      }
    }
  }

  loadTasks();

const taskRefreshInterval = window.setInterval(() => {
  loadTasks();
}, 3000);

return () => {
  cancelled = true;
  window.clearInterval(taskRefreshInterval);
};
}, [navigate]);

useEffect(() => {
  const token = sessionStorage.getItem("worksyncToken");

  if (!token) {
    setChatStatus("Please log in again.");
    return;
  }

  const socket = io("https://worksync-891n.onrender.com", {
    auth: { token },
  });

  chatSocketRef.current = socket;

  function updateUnreadCount() {
    if (!socket.connected) return;

    socket.emit("get-unread-count", (result) => {
      if (result?.success) {
        setUnreadMessageCount(result.unreadCount || 0);
      }
    });
  }

  socket.on("connect", updateUnreadCount);

  
  const unreadInterval = window.setInterval(
    updateUnreadCount,
    5000
  );

  socket.on("connect_error", (error) => {
    console.error("Chat connection error:", error.message);
  });

  return () => {
    window.clearInterval(unreadInterval);
    socket.disconnect();
    chatSocketRef.current = null;
  };
}, []);

useEffect(() => {
  if (!chatProjectId && projectList.length > 0) {
    setChatProjectId(projectList[0]._id);
  }
}, [projectList, chatProjectId]);



useEffect(() => {
  async function fetchProjects() {
    try {
      const token = sessionStorage.getItem("worksyncToken");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "https://worksync-891n.onrender.com/api/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        sessionStorage.removeItem("worksyncToken");
        sessionStorage.removeItem("worksyncUser");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to load projects.");
      }

      const data = await response.json();
      console.log("FIRST PROJECT:", data[0]);
console.table(
  data.map((project) => ({
    id: project._id,
    name: project.name,
    title: project.title,
  }))
);
      setProjectList(data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setProjectsLoading(false);
    }
  }

  fetchProjects();

  const intervalId = setInterval(fetchProjects, 3000);

  return () => clearInterval(intervalId);
}, [navigate]);


  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesFilter =
        filter === "All tasks" ||
        (filter === "In progress" && task.status === "In progress") ||
        (filter === "To do" && task.status === "To do") ||
        (filter === "Completed" && task.status === "Done");
      const matchesSearch = `${task.title} ${task.project}`.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, search]);

  const completedCount = tasks.filter((task) => task.status === "Done").length;

  useEffect(() => {
  if (active !== "Messages" || !chatProjectId) {
    return;
  }

  const socket = chatSocketRef.current;

  if (!socket) {
    setChatStatus("Connecting...");
    return;
  }

  let cancelled = false;

  function joinSelectedProject() {
    if (!socket.connected) return;

    setChatMessages([]);
    setChatStatus("Connecting...");

    socket.emit("join-project", chatProjectId, (result) => {
      if (cancelled) return;

      if (!result?.success) {
        setChatStatus(
          result?.message || "Could not join project chat"
        );
        return;
      }

      setChatMessages(result.messages || []);
      setChatStatus("Connected to project chat");

      refreshUnreadMessageCount(socket);
    });
  }

  function handleNewMessage(message) {
    if (String(message.projectId) !== String(chatProjectId)) {
      return;
    }

    setChatMessages((currentMessages) => {
      if (
        currentMessages.some(
          (item) => item._id === message._id
        )
      ) {
        return currentMessages;
      }

      return [...currentMessages, message];
    });

    refreshUnreadMessageCount(socket);
  }

  socket.on("new-message", handleNewMessage);
  socket.on("connect", joinSelectedProject);

  if (socket.connected) {
    joinSelectedProject();
  }

  return () => {
    cancelled = true;
    socket.off("new-message", handleNewMessage);
    socket.off("connect", joinSelectedProject);
  };
}, [active, chatProjectId]);

  function refreshUnreadMessageCount(socket) {
  if (!socket || !socket.connected) return;

  socket.emit("get-unread-count", (result) => {
    if (result?.success) {
      setUnreadMessageCount(result.unreadCount || 0);
    }
  });
}


useEffect(() => {
  const container = messagesContainerRef.current;

  if (!container || !shouldAutoScrollRef.current) {
    return;
  }

  container.scrollTop = container.scrollHeight;
}, [chatMessages]);


function sendChatMessage(event) {
  event.preventDefault();

  const text = chatText.trim();

  if (!text || !chatProjectId || !chatSocketRef.current) {
    return;
  }

  chatSocketRef.current.emit(
    "send-message",
    {
      projectId: chatProjectId,
      text,
    },
    (result) => {
      if (!result?.success) {
        setChatStatus(result?.message || "Message failed to send");
        return;
      }

      setChatText("");
    }
  );
}


  
 async function toggleTask(id, selectedStatus) {
  const currentTask = tasks.find((task) => task.id === id);
  if (!currentTask) return;

  const newStatus =
    selectedStatus ||
    (currentTask.status === "Done" ? "To do" : "Done");
 

  const token = sessionStorage.getItem("worksyncToken");

  try {
    const response = await fetch(
      `https://worksync-891n.onrender.com/api/tasks/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "The task was not updated.");
    }

    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...data.task, id: data.task._id }
          : task
      )
    );

    setToast("Task status saved successfully");
    window.setTimeout(() => setToast(""), 2500);
  } catch (error) {
    setToast(error.message ||  "Failed to delete task.");
    window.setTimeout(() => setToast(""), 2500);
  }
}

async function handleTaskTimer(task) {
  const token = sessionStorage.getItem("worksyncToken");

  if (!token) {
    navigate("/login", { replace: true });
    return;
  }

  const action = task.timerStartedAt ? "stop" : "start";

  try {
    const response = await fetch(
      `https://worksync-891n.onrender.com/api/tasks/${task.id}/timer/${action}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "The timer didn't update.");
    }

    setTasks((currentTasks) =>
      currentTasks.map((currentTask) =>
        currentTask.id === task.id
          ? { ...data.task, id: data.task._id }
          : currentTask
      )
    );

    setToast(
      action === "start" ? "Timer started!" : "Timer stopped!"
    );

    window.setTimeout(() => setToast(""), 2500);
  } catch (error) {
    setToast(error.message || "The timer didn't update.");
    window.setTimeout(() => setToast(""), 2500);
  }
}

async function deleteTask(id) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmed) return;

  const token = sessionStorage.getItem("worksyncToken");

  try {
    const response = await fetch(
      `https://worksync-891n.onrender.com/api/tasks/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.status === 401) {
      sessionStorage.removeItem("worksyncToken");
      sessionStorage.removeItem("worksyncUser");
      navigate("/login", { replace: true });
      return;
    }

    if (!response.ok) {
      throw new Error(data.message ||  "Failed to delete task.");
    }

    setTasks((current) =>
      current.filter((task) => task.id !== id)
    );

    setToast("Task deleted successfully!");

    window.setTimeout(() => setToast(""), 2500);
  } catch (error) {
    setToast(error.message || "Failed to delete task.");
    window.setTimeout(() => setToast(""), 2500);
  }
}



  
async function addTask(event) {
  event.preventDefault();

  const title = newTaskTitle.trim();

  if (!title) return;

  const token = sessionStorage.getItem("worksyncToken");

  try {
    const response = await fetch("https://worksync-891n.onrender.com/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      
body: JSON.stringify({
  title,
  projectId: newTaskProjectId || null,
  project:
    projectList.find(
      (project) => project._id === newTaskProjectId
    )?.name || "Personal task",
  assignedTo: newTaskAssigneeId || null,
  date: newTaskDate,
  priority: newTaskPriority,
  status: "To do",
}),

    });

    const data = await response.json();

    if (response.status === 401) {
      sessionStorage.removeItem("worksyncToken");
      sessionStorage.removeItem("worksyncUser");
      navigate("/login", { replace: true });
      return;
    }

    if (!response.ok) {
      throw new Error(data.message || "The task failed to save.");
    }

    const savedTask = {
      ...data.task,
      id: data.task._id,
    };

    setTasks((current) => [...current, savedTask]);
    setNewTaskTitle("");
    setNewTaskDate("");
    setShowAddTask(false);
    setFilter("All tasks");
    setToast("Task saved successfully!");

    window.setTimeout(() => setToast(""), 2500);
  } catch (error) {
    setToast(error.message || "Couldn't connect to the Backend.");
    window.setTimeout(() => setToast(""), 2500);
  }
}

async function addProject(event) {
  event.preventDefault();

  if (!newProjectName.trim()) {
    setToast("Project name is required.");
    return;
  }

  try {
    const token = sessionStorage.getItem("worksyncToken");

    const response = await fetch(
      "https://worksync-891n.onrender.com/api/projects",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newProjectName.trim(),
          description: newProjectDescription.trim(),
          color: newProjectColor,
          dueDate: newProjectDate || null,
        }),
      }
    );

    const data = await response.json();

    if (response.status === 401) {
      sessionStorage.removeItem("worksyncToken");
      sessionStorage.removeItem("worksyncUser");
      navigate("/login");
      return;
    }

    if (!response.ok) {
      throw new Error(data.message || "Failed to create project.");
    }

    setProjectList((previousProjects) => [data, ...previousProjects]);
    setNewProjectName("");
    setNewProjectDescription("");
    setNewProjectColor("purple");
    setNewProjectDate("");
    setShowAddProject(false);
    setToast("Project created successfully!");
  } catch (error) {
    setToast(error.message || "Failed to create project.");
  }
}

async function deleteProject(projectId) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this project?"
  );

  if (!confirmed) return;

  try {
    const token = sessionStorage.getItem("worksyncToken");

    const response = await fetch(
      `https://worksync-891n.onrender.com/api/projects/${projectId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.status === 401) {
      sessionStorage.removeItem("worksyncToken");
      sessionStorage.removeItem("worksyncUser");
      navigate("/login", { replace: true });
      return;
    }

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete project.");
    }

    setProjectList((currentProjects) =>
      currentProjects.filter(
        (project) => project._id !== projectId
      )
    );

    setToast("Project deleted successfully!");
    window.setTimeout(() => setToast(""), 2500);
  } catch (error) {
    setToast(error.message || "Failed to delete project.");
    window.setTimeout(() => setToast(""), 2500);
  }
}



  function selectNav(label) {
    setActive(label);
    if (label === "Overview") navigate("/dashboard");
  }


async function openManageMembers(project) {
  setSelectedProject(project);
  setMemberEmail("");
  setMemberMessage("");
  setMemberResults([]);
  setProjectMembers([]);

  try {
    const token = sessionStorage.getItem("worksyncToken");

    const response = await fetch(
      "https://worksync-891n.onrender.com/api/projects",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to load projects.");
    }

    const currentProject = data.find(
      (item) => item._id === project.id
    );

    if (currentProject) {
      setProjectMembers(currentProject.members || []);
    } else {
      setMemberMessage("Project not found.");
    }
  } catch (error) {
    setMemberMessage(error.message || "Failed to load project members.");
  }
}


async function searchMembers(event) {
  event.preventDefault();

  if (!memberEmail.trim()) {
    setMemberMessage("Please enter an email address.");
    return;
  }

  try {
    setMemberLoading(true);
    setMemberMessage("");
    
    const token = sessionStorage.getItem("worksyncToken");

    const response = await fetch(
      `https://worksync-891n.onrender.com/api/projects/users/search?email=${encodeURIComponent(memberEmail)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to search users.");
    }

   
if (data.length === 0) {
  setMemberResults([]);
  setMemberMessage("No registered users found.");
} else {
  setMemberResults(data);
  setMemberMessage("");
}

  } catch (error) {
    setMemberMessage(error.message || "Something went wrong.");
  } finally {
    setMemberLoading(false);
  }
}


async function addMember(user) {
  if (!selectedProject) return;

  try {
    setAddingMember(true);
    setMemberMessage("");

    const token = sessionStorage.getItem("worksyncToken");

    const response = await fetch(
      `https://worksync-891n.onrender.com/api/projects/${selectedProject.id}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: user.email }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add project member.");
    }

    setMemberResults((previous) =>
      previous.filter((member) => member._id !== user._id)
    );
    setMemberMessage(`${user.name} added successfully.`);
  } catch (error) {
    setMemberMessage(error.message || "Something went wrong.");
  } finally {
    setAddingMember(false);
  }
}
  

async function removeMember(member) {
  if (!selectedProject) return;

  const confirmed = window.confirm(
    `Remove ${member.name} from this project?`
  );

  if (!confirmed) return;

  try {
    setAddingMember(true);
    setMemberMessage("");

    const token = sessionStorage.getItem("worksyncToken");

    const response = await fetch(
      `https://worksync-891n.onrender.com/api/projects/${selectedProject.id}/members/${member._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to remove member.");
    }

    setProjectMembers((previous) =>
      previous.filter((item) => item._id !== member._id)
    );

    setMemberMessage(`${member.name} was removed successfully.`);
  } catch (error) {
    setMemberMessage(error.message || "Something went wrong.");
  } finally {
    setAddingMember(false);
  }
}

  
const addProjectForm = showAddProject ? (
  <div className="modal-overlay">
    <div className="modal-card">
      <h2>Create Project</h2>
      <p>Add a new project to your workspace.</p>

      <form onSubmit={addProject}>
        <label htmlFor="project-name">Project Name</label>
        <input
          id="project-name"
          type="text"
          value={newProjectName}
          onChange={(event) => setNewProjectName(event.target.value)}
          placeholder="Enter project name"
          maxLength={100}
          required
        />

        <label htmlFor="project-description">Description</label>
        <textarea
          id="project-description"
          value={newProjectDescription}
          onChange={(event) => setNewProjectDescription(event.target.value)}
          placeholder="Describe your project"
          maxLength={500}
          rows={3}
        />

        <label htmlFor="project-color">Project Color</label>
        <select
          id="project-color"
          value={newProjectColor}
          onChange={(event) => setNewProjectColor(event.target.value)}
        >
          <option value="purple">Purple</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
                </select>

        <label htmlFor="project-deadline">Project Deadline</label>
        <input
          id="project-deadline"
          type="date"
          value={newProjectDate}
          onChange={(event) => setNewProjectDate(event.target.value)}
          min={new Date().toLocaleDateString("en-CA")}
          required
        />

        <div className="modal-actions">
          <button
            type="button"
            className="btn-outline"
            onClick={() => setShowAddProject(false)}
          >
            Cancel
          </button>

          <button type="submit" className="btn-primary">
            Create Project
          </button>
        </div>
      </form>
    </div>
  </div>
) : null;


const memberModal = selectedProject ? (
  <div className="modal-overlay">
    <div className="modal-card">
      <h2>Manage Members</h2>
      <p>
        Add a registered user to "{selectedProject.name}".
      </p>

     <form onSubmit={searchMembers}>
      
<div className="existing-members">
  <h3>Current Members ({projectMembers.length})</h3>

  {projectMembers.length === 0 ? (
    <p>No members added yet.</p>
  ) : (
    projectMembers.map((member) => (
      
<div className="member-result" key={member._id}>
  <div>
    <strong>{member.name}</strong>
    <p>{member.email}</p>
  </div>

  <button
    type="button"
    className="btn-outline"
    disabled={addingMember}
    onClick={() => removeMember(member)}
  >
    {addingMember ? "Please wait..." : "Remove"}
  </button>
</div>

    ))
  )}
</div>

        <label htmlFor="member-email">Member Email</label>
        <input
          id="member-email"
          type="email"
          value={memberEmail}
          onChange={(event) => setMemberEmail(event.target.value)}
          placeholder="Enter registered email"
          required
        />

        {memberMessage && <p>{memberMessage}</p>}
        
{memberResults.map((user) => (
  <div className="member-result" key={user._id}>
    <div>
      <strong>{user.name}</strong>
      <p>{user.email}</p>
    </div>

    <button
      type="button"
      className="btn-primary"
      disabled={addingMember}
      onClick={() => addMember(user)}
    >
      {addingMember ? "Adding..." : "Add Member"}
    </button>
  </div>
))}


        <div className="modal-actions">
          <button
            type="button"
            className="btn-outline"
            onClick={() => setSelectedProject(null)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn-primary"
            disabled={memberLoading}
           >
           {memberLoading ? "Searching..." : "Search Member"}
          </button>
        </div>
      </form>
    </div>
  </div>
) : null;


const now = new Date();
const currentHour = now.getHours();

const greeting =
  currentHour < 12
    ? "Good morning"
    : currentHour < 17
    ? "Good afternoon"
    : currentHour < 21
    ? "Good evening"
    : "Good night";

const todayDate = now
  .toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })
  .toUpperCase();

  const teammates = useMemo(() => {
  const people = new Map();

  for (const project of projectList) {
    const owner =
      project.user && typeof project.user === "object"
        ? project.user
        : null;

    const members = Array.isArray(project.members)
      ? project.members.filter(
          (member) => member && typeof member === "object"
        )
      : [];

    const team = [
      ...(owner ? [[owner, "Project Owner"]] : []),
      ...members.map((member) => [member, "Team Member"]),
    ];

    for (const [member, role] of team) {
      const id = member._id || member.email;
      if (!id) continue;

      const key = String(id);
      const previous = people.get(key);

      people.set(key, {
        initials: (member.name || member.email || "U")
          .split(/\s+/)
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
        name: member.name || member.email || "Unknown user",
        email: member.email || "",
        role:
          previous?.role === "Project Owner" ||
          role === "Project Owner"
            ? "Project Owner"
            : role,
        color: "avatar-purple",
        online: false,
      });
    }
  }

  return [...people.values()];
}, [projectList]);

useEffect(() => {
  let cancelled = false;

  async function loadNotifications() {
    const token = sessionStorage.getItem("worksyncToken");
    if (!token) return;

    setNotificationsLoading(true);

    try {
      const response = await fetch(
        "https://worksync-891n.onrender.com/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Could not load notifications.");
      }

      const data = await response.json();

      if (!cancelled) {
        setNotifications(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Notifications error:", error);
    } finally {
      if (!cancelled) {
        setNotificationsLoading(false);
      }
    }
  }

  loadNotifications();

  const intervalId = window.setInterval(loadNotifications, 10000);

  return () => {
    cancelled = true;
    window.clearInterval(intervalId);
  };
}, []);

  return (
    <div className="dashboard-shell">
      <Sidebar active={active} setActive={selectNav} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} projectList={projectList} unreadMessageCount={unreadMessageCount}/>

      <main className="dashboard-main">
         {addProjectForm}
         {memberModal}
        <header className="dashboard-topbar">
          <button className="icon-btn mobile-menu-button" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={21} /></button>
          <div className="breadcrumb"><span>Workspace</span><span className="breadcrumb-slash">/</span><b>{active}</b></div>
          <div className="topbar-actions">
            <label className="dashboard-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search anything..." /><kbd>⌘ K</kbd></label>
            <div className="notification-wrap">
       <button
  className="icon-btn notification-button"
  onClick={() => setShowNotifications((value) => !value)}
  aria-label={`Notifications, ${unreadNotificationsCount} unread`}
>
  <Bell size={19} />
  <i />

  {unreadNotificationsCount > 0 && (
    <span className="notification-count-badge">
      {unreadNotificationsCount > 99 ? "99+" : unreadNotificationsCount}
    </span>
  )}
</button>
              
{showNotifications && (
  <div className="notification-popover">
    <b>Notifications</b>

    {notificationsLoading && notifications.length === 0 && (
      <p>Loading notifications...</p>
    )}

    {!notificationsLoading && notifications.length === 0 && (
      <p>No notifications yet.</p>
    )}

    {notifications.map((notification) => (
      <div
        key={notification._id}
        className="notification-item"
        style={{
          opacity: notification.isRead ? 0.65 : 1,
          marginTop: "12px",
        }}
      >
        <p>
          <span
            className={
              notification.isRead
                ? "notification-dot blue-notification"
                : "notification-dot"
            }
          />
          {notification.message}
        </p>

        {!notification.isRead && (
          <button
           className="mark-read-button"
            onClick={async () => {
              const token = sessionStorage.getItem("worksyncToken");

              try {
                const response = await fetch(
                  `https://worksync-891n.onrender.com/api/notifications/${notification._id}/read`,
                  {
                    method: "PATCH",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                if (!response.ok) {
                  throw new Error("Could not mark notification as read.");
                }

                setNotifications((current) =>
                  current.map((item) =>
                    item._id === notification._id
                      ? { ...item, isRead: true }
                      : item
                  )
                );
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Mark as read
          </button>
        )}
      </div>
    ))}

    <button onClick={() => setShowNotifications(false)}>
      Close
    </button>
  </div>
)}

            </div>
            
            <div className="topbar-user-actions">
            
<Avatar
  initials={userName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()}
  color="avatar-pink"
/>


           <button
            className="btn-outline"
            type="button"
            onClick={() => {
            sessionStorage.removeItem("worksyncToken");
            sessionStorage.removeItem("worksyncUser");
            navigate("/login", { replace: true });
            }}
            >
           <LogOut size={16} />
            Logout
           </button>
           </div>

          </div>
        </header>

        <div className="dashboard-content">
          {active === "Overview" && (
            <>
              
<div className="dashboard-heading-row">
  <div>
    <div className="welcome-kicker">
      <span className="welcome-dot" /> {todayDate}
    </div>

    <h1>
      {greeting}, {userName} <span>✦</span>
    </h1>

    <p>Here's what's happening with your workspace today.</p>
  </div>

  <button
    className="btn-primary"
    onClick={() => setShowAddTask(true)}
  >
    <Plus size={17} /> New task
  </button>
</div>


<section className="stats-grid">
  <StatCard
    icon={FolderKanban}
    label="Active projects"
    value={String(projectList.length)}
    color="stat-purple"
    note="Your actual projects"
  />
  <StatCard
    icon={ListTodo}
    label="Tasks completed"
    value={String(tasks.filter((task) => task.status === "Done").length)}
    color="stat-blue"
    note="Your actual tasks"
  />
  <StatCard
  icon={Clock3}
  label="Hours tracked"
  value={hoursTrackedLabel}
  color="stat-green"
  note="Total time tracked across your tasks"
/>
  <StatCard
    icon={Users}
    label="Team members"
    value={String(
      new Set(
        projectList.flatMap((project) =>
          (project.members || []).map((member) =>
            typeof member === "string" ? member : member._id
          )
        )
      ).size
    )}
    color="stat-orange"
    note="Across your projects"
  />
</section>


              <section className="dashboard-section">
                <div className="section-title-row"><div><h2>Your projects</h2><p>Keep an eye on your team's progress.</p></div><button className="btn-outline" onClick={() => setActive("Projects")}>View all projects <ArrowRight size={15} /></button></div>
                
<div className="projects-grid">
  {projectsLoading ? (
    <p className="empty-tasks">Loading projects...</p>
  ) : projectList.length === 0 ? (
    <p className="empty-tasks">
      No projects yet. Create your first project!
    </p>
  ) : (
    projectList.slice(0, 3).map((project) => {
      const members = (project.members || []).map((member) =>
        typeof member === "string"
          ? member
          : member.name || member.email || "Member"
      );

      const projectTasks = tasks.filter(
  (task) =>
    String(task.projectId?._id || task.projectId) ===
    String(project._id)
);

const doneTasks = projectTasks.filter(
  (task) => task.status === "Done"
).length;

const totalTasks = projectTasks.length;

const projectTotalSeconds = projectTasks.reduce((total, task) => {
  const savedSeconds = Number(task.trackedSeconds || 0);

  const runningSeconds = task.timerStartedAt
    ? Math.max(
        0,
        Math.floor(
          (Date.now() - new Date(task.timerStartedAt).getTime()) / 1000
        )
      )
    : 0;

  return total + savedSeconds + runningSeconds;
}, 0);

const projectHours = Math.floor(projectTotalSeconds / 3600);

const projectMinutes = Math.floor(
  (projectTotalSeconds % 3600) / 60
);

const projectTrackedTime = `${projectHours}h ${projectMinutes}m`;

const progress =
  totalTasks === 0
    ? 0
    : Math.round((doneTasks / totalTasks) * 100);

      return (
        <ProjectCard
          key={project._id}
          project={{
            id: project._id,
            name: project.name,
            description: project.description || "No description added",
            color: project.color || "purple",
            progress: progress,
            done: doneTasks,
            total: totalTasks,
            trackedTime: projectTrackedTime,
            members,
            due: project.dueDate
              ? new Date(project.dueDate).toLocaleDateString()
              : "No deadline",
          }}
        />
      );
    })
  )}
</div>

              </section>

              <section className="dashboard-section task-section">
                <div className="section-title-row"><div><h2>My tasks <span className="count-pill">{tasks.length}</span></h2><p>A few things to keep moving today.</p></div><button className="btn-outline" onClick={() => setActive("My Tasks")}>View all tasks <ArrowRight size={15} /></button></div>
                <div className="task-panel">
                  <div className="task-toolbar">
                    <div className="task-filters">{["All tasks", "In progress", "To do", "Completed"].map((item) => <button key={item} className={filter === item ? "filter-active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
                    <button className="icon-btn" aria-label="Task options"><MoreHorizontal size={19} /></button>
                  </div>
                  {tasksLoading ? (  <p className="empty-tasks">Loading tasks...</p>) : (
                  <TaskTable
                    tasks={filteredTasks.slice(0, 4)}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onTimer={handleTaskTimer}
                    />
                  )}
  
                  <div className="task-panel-footer"><span>Showing {Math.min(filteredTasks.length, 4)} of {filteredTasks.length} tasks</span><button onClick={() => setActive("My Tasks")}>See all tasks <ArrowRight size={14} /></button></div>
                </div>
              </section>

              <section className="dashboard-section team-section">
                <div className="section-title-row"><div><h2>Your team</h2><p>People making things happen.</p></div><button className="btn-outline" onClick={() => setActive("Team")}>Meet the team <ArrowRight size={15} /></button></div>
                <div className="team-grid">{teammates.map((member) => <div className="team-card" key={member.initials}><Avatar initials={member.initials} color={member.color} /><div className="team-member-info"><b>{member.name}</b><span>{member.role}</span></div><span className={`presence ${member.online ? "presence-online" : ""}`} title={member.online ? "Online" : "Offline"} /></div>)}</div>
              </section>
            </>
          )}

          {active === "Projects" && (
            <section className="secondary-page">
              <div className="dashboard-heading-row"><div><div className="welcome-kicker">YOUR WORKSPACE</div><h1>Projects</h1><p>All your team's work, organized in one place.</p></div>
                <button
                  className="btn-primary"
                   onClick={() => setShowAddProject(true)}
                   >
                   <Plus size={17} /> New project
                   </button>
                  </div>

              

<div className="projects-grid secondary-project-grid">
  {projectsLoading ? (
    <p className="empty-tasks">Loading projects...</p>
  ) : projectList.length === 0 ? (
    <p className="empty-tasks">
      No projects yet. Create your first project!
    </p>
  ) : (
    projectList.map((project) => {
      console.log("Project owner:", project.user?._id);
      console.log(
        "Logged in user:",
        JSON.parse(sessionStorage.getItem("worksyncUser") || "{}")._id
      );
      
    const projectTasks = tasks.filter(
  (task) =>
    String(task.projectId?._id || task.projectId) ===
    String(project._id)
);

const doneTasks = projectTasks.filter(
  (task) => task.status === "Done"
).length;

const totalTasks = projectTasks.length;

const progress =
  totalTasks === 0
    ? 0
    : Math.round((doneTasks / totalTasks) * 100);





      return (
        <ProjectCard
          key={project._id}
          isOwner={
            project.user?._id ===
            JSON.parse(sessionStorage.getItem("worksyncUser") || "{}").id
          }
          onDelete={deleteProject}
          onManageMembers={openManageMembers}
          project={{
            id: project._id,
            name: project.name,
            description: project.description,
            color: project.color,
            progress: progress,
            done: doneTasks,
            total: totalTasks,
            trackedTime: projectTrackedTime.find(
  (item) => String(item.projectId) === String(project._id)
)?.trackedTime || "0h 0m",
            members: (project.members || []).map(
              (member) => member.name
            ),
            due: project.dueDate
              ? new Date(project.dueDate).toLocaleDateString()
              : "No deadline",
          }}
        />
      );
    })
  )}
</div>


              <div className="info-note"><Sparkles size={18} /><div><b>Make progress visible</b><p>Project cards show task completion, team members and deadlines. Backend persistence will be added in the next stage.</p></div></div>
            </section>
          )}

          {active === "My Tasks" && (
            <section className="secondary-page">
              <div className="dashboard-heading-row"><div><div className="welcome-kicker">STAY ON TRACK</div><h1>My tasks</h1><p>Manage your next steps and mark work complete.</p></div><button className="btn-primary" onClick={() => setShowAddTask(true)}><Plus size={17} /> New task</button></div>
              <div className="task-panel full-task-panel"><div className="task-toolbar"><div className="task-filters">{["All tasks", "In progress", "To do", "Completed"].map((item) => <button key={item} className={filter === item ? "filter-active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
             {tasksLoading ? (
             <p className="empty-tasks">Loading tasks...</p>
             ) : (
             <TaskTable tasks={filteredTasks} onToggle={toggleTask}onDelete={deleteTask}onTimer={handleTaskTimer} />
             )}
           </div>
            </section>
          )}

          {active === "Team" && (
            <section className="secondary-page">
              <div className="dashboard-heading-row"><div><div className="welcome-kicker">BETTER TOGETHER</div><h1>Your team</h1><p>Meet the people behind the progress.</p></div><button className="btn-primary" onClick={() => { setToast("Team invitations will be enabled with backend authentication."); window.setTimeout(() => setToast(""), 2500); }}><Plus size={17} /> Invite member</button></div>
              <div className="team-grid full-team-grid">{teammates.map((member) => <div className="team-card" key={member.initials}><Avatar initials={member.initials} color={member.color} /><div className="team-member-info"><b>{member.name}</b><span>{member.role}</span>{member.email && <span>{member.email}</span>}</div><span className={`presence ${member.online ? "presence-online" : ""}`} title={member.online ? "Online" : "Offline"} /></div>)}</div>
            </section>
          )}

          
{active === "Messages" && (
  <section className="secondary-page">
    <div className="dashboard-heading-row">
      <div>
        <div className="welcome-kicker">TEAM COMMUNICATION</div>
        <h1>Group Chat</h1>
        <p>Talk with your project team in real time.</p>
      </div>
    </div>

    <div className="worksync-chat">
      <div className="chat-toolbar">
        <label htmlFor="chat-project">Choose project</label>

        <select
          id="chat-project"
          value={chatProjectId}
          onChange={(event) => {
            setChatProjectId(event.target.value);
          }}
        >
          <option value="">Select a project</option>

          {projectList.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>

        <span className="chat-status">{chatStatus}</span>
      </div>

      
<div
  className="chat-messages"
  ref={messagesContainerRef}
  onScroll={(event) => {
    const element = event.currentTarget;

    shouldAutoScrollRef.current =
      element.scrollHeight -
        element.scrollTop -
        element.clientHeight <
      80;
  }}
>

        {chatMessages.length === 0 ? (
          <div className="chat-empty">
            <h3>No messages yet</h3>
            <p>Send the first message to your project team.</p>
          </div>
        ) : (
          chatMessages.map((message) => (
            <div className="chat-message" key={message._id}>
              <div className="chat-message-meta">
                <strong>
                  {message.sender?.name ||
                    message.sender?.email ||
                    "Team member"}
                </strong>

                <span>
                  {message.createdAt
                    ? new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
              </div>

              <p>{message.text}</p>
            </div>
          ))
        )}
      </div>

      <form className="chat-form" onSubmit={sendChatMessage}>
        <input
          type="text"
          value={chatText}
          onChange={(event) => setChatText(event.target.value)}
          placeholder="Write a message..."
          maxLength={2000}
          disabled={!chatProjectId}
        />

        <button
          type="submit"
          className="btn-primary"
          disabled={!chatProjectId || !chatText.trim()}
        >
          Send
        </button>
      </form>
    </div>
  </section>
)}

          {active === "Settings" && (
            <section className="secondary-page">
              <div className="dashboard-heading-row"><div><div className="welcome-kicker">PERSONALIZE YOUR SPACE</div><h1>Settings</h1><p>Workspace preferences and account details.</p></div></div>
              <div className="settings-card"><div className="settings-row"><span className="settings-icon"><Users size={18} /></span><div><b>Profile settings</b><p>Neha Sharma · Free workspace</p></div><button className="btn-outline" onClick={() => { setToast("Profile editing will be available after backend setup."); window.setTimeout(() => setToast(""), 2500); }}>Edit profile</button></div><div className="settings-row"><span className="settings-icon"><Bell size={18} /></span><div><b>Notifications</b><p>Stay up to date with workspace activity.</p></div><span className="settings-status">Enabled</span></div><div className="settings-row"><span className="settings-icon"><ShieldCheck size={18} /></span><div><b>Security</b><p>Authentication and account protection.</p></div><span className="settings-status">Demo mode</span></div><button className="btn-outline settings-home" onClick={() => navigate("/")}> <LogOut size={15} /> Return to landing page</button></div>
            </section>
          )}

          <footer className="dashboard-footer"><Brand /><span>Made for better teamwork.</span><span>WorkSync © 2026</span></footer>
        </div>
      </main>

      {showAddTask && (<div className="modal-backdrop" onClick={() => setShowAddTask(false)}><div className="task-modal" onClick={(event) => event.stopPropagation()}><div className="modal-header"><div><h2>Create a task</h2><p>Add a new item to your task list.</p></div><button className="icon-btn" onClick={() => setShowAddTask(false)} aria-label="Close"><X size={19} /></button></div><form onSubmit={addTask}><label htmlFor="task-title">Task name</label><input id="task-title" autoFocus value={newTaskTitle} onChange={(event) => setNewTaskTitle(event.target.value)} placeholder="e.g. Review project proposal" maxLength={100} required />
<label htmlFor="new-task-date">Deadline</label>
<input
  id="new-task-date"
  type="date"
  value={newTaskDate}
  onChange={(event) => setNewTaskDate(event.target.value)}
  min={new Date().toLocaleDateString("en-CA")}
  required
/>


<label htmlFor="task-priority">Priority</label>
<select
  id="task-priority"
  value={newTaskPriority}
  onChange={(event) =>
    setNewTaskPriority(event.target.value)
  }
>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
</select>

<label htmlFor="task-project">Select project</label>
<select
  id="task-project"
  value={newTaskProjectId}
  onChange={(event) => {
    setNewTaskProjectId(event.target.value);
    setNewTaskAssigneeId("");
  }}
>
  <option value="">Personal task (no project)</option>
  {projectList.map((project) => (
    <option key={project._id} value={project._id}>
      {project.name}
    </option>
  ))}
</select>
{newTaskProjectId && (
  <>
    <label htmlFor="task-assignee">Assign to</label>
    <select
      id="task-assignee"
      value={newTaskAssigneeId}
      onChange={(event) =>
        setNewTaskAssigneeId(event.target.value)
      }
    >
      <option value="">Unassigned</option>
      {(() => {
        const selectedProject = projectList.find(
          (project) => project._id === newTaskProjectId
        );

        const members = [
          ...(selectedProject?.user
            ? [selectedProject.user]
            : []),
          ...(selectedProject?.members || []),
        ];

        const uniqueMembers = members.filter(
          (member, index, list) =>
            member?._id &&
            list.findIndex(
              (item) => item?._id === member._id
            ) === index
        );

        return uniqueMembers.map((member) => (
          <option key={member._id} value={member._id}>
            {member.name || member.email}
          </option>
        ));
      })()}
    </select>
  </>
)}
<div className="modal-info">
  <FolderKanban size={15} />
  {projectList.find(
    (project) => project._id === newTaskProjectId
  )?.name || "Personal task"}
  <span>·</span>
  {newTaskPriority} priority
</div>


<div className="modal-actions">
  <button
    type="button"
    className="btn-outline"
    onClick={() => setShowAddTask(false)}
  >
    Cancel
  </button>

  <button className="btn-primary" type="submit">
    <Plus size={16} /> Add task
  </button>
</div>
</form>
</div>
</div>
)}

      {toast && <div className="toast-message"><CheckCircleIcon /> {toast}</div>}
    </div>
  );
}

function CheckCircleIcon() {
  return <span className="toast-check"><Check size={14} /></span>;
}


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Auth />} />

      <Route path="/signup" element={<Auth />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}

