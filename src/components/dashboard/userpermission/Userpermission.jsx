import { useEffect, useState } from "react";
import { listedUser, permissionList, useAdduserPermission } from "../../../hooks/api";


const ACTIONS = ["view", "add", "edit", "delete"];

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function UserPermission() {
    const permissionMutation = useAdduserPermission();
  const [selectedUser, setSelectedUser] = useState("");
  // { [permissionId]: Set<action> }
  const [permissionMap, setPermissionMap] = useState({});

  // ── Fetch Users ──
  const { data: users = [], isLoading: usersLoading } = listedUser()
  

  // ── Fetch Permissions ──
  const { data: permissions = [], isLoading: permsLoading } = permissionList();

  // ── Initialize permission map when data loads ──
  useEffect(() => {
    if (permissions.length) {
      const initial = {};
      permissions.forEach((p) => {
        initial[p._id] = new Set();
      });
      setPermissionMap(initial);
    }
  }, [permissions]);

  // ── Reset Function ──
  const resetForm = () => {
    setSelectedUser("");
    const cleared = {};
    permissions.forEach((p) => {
      cleared[p._id] = new Set();
    });
    setPermissionMap(cleared);
  };



  // ── Toggle single action checkbox ──
  const toggleAction = (permId, action) => {
    setPermissionMap((prev) => {
      const current = new Set(prev[permId]);
      current.has(action) ? current.delete(action) : current.add(action);
      return { ...prev, [permId]: current };
    });
  };

  // ── Permission All toggle ──
  const isAllChecked =
    permissions.length > 0 &&
    permissions.every((p) =>
      ACTIONS.every((a) => permissionMap[p._id]?.has(a)),
    );

  const toggleAll = () => {
    const newMap = {};
    permissions.forEach((p) => {
      newMap[p._id] = isAllChecked ? new Set() : new Set(ACTIONS);
    });
    setPermissionMap(newMap);
  };

  // ── Submit ──
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedUser) {
      alert("Please select a user first.");
      return;
    }

    const permissionList = Object.entries(permissionMap)
      .filter(([, actions]) => actions.size > 0)
      .map(([permId, actions]) => ({
        
        permisson: permId, 
        actions: [...actions],
      }));

    const payload = { user: selectedUser, permissionList };
    permissionMutation.mutate(payload)
    

  };

  // ─────────────────────────────────────────────
  // LOADING STATE
  // ─────────────────────────────────────────────
  if (usersLoading || permsLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-teal-500 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading data...</p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
      <div className="bg-white rounded-xl shadow-md w-full max-w-5xl self-start overflow-hidden">
        {/* ── User Selector ── */}
        <div className="px-7 pt-6 pb-5">
          <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide">
            User Name & ID <span className="text-red-500">*</span>
          </label>
          <select
            className="min-w-[280px] px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 cursor-pointer outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">— Select User —</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} | {u.email}
              </option>
            ))}
          </select>
        </div>

        {/* ── Banner ── */}
        <div className="bg-teal-500 px-7 py-4 flex items-center justify-center">
          <span className="text-white font-bold text-base tracking-wide">
            Making User Permission
          </span>
        </div>

        {/* ── Permission All ── */}
        <div className="flex items-center justify-center gap-3 px-7 py-3.5 border-b border-gray-100">
          <span className="text-teal-600 font-bold text-sm">
            Permission All
          </span>
          <Checkbox checked={isAllChecked} onChange={toggleAll} />
        </div>

        {/* ── Module Name Heading ── */}
        <div className="px-7 pt-3.5 pb-1">
          <span className="text-teal-600 font-bold text-sm">Module Name</span>
        </div>

        {/* ── Permission Rows ── */}
        <form onSubmit={handleSubmit}>
          <div className="border-t border-gray-100">
            {permissions.map((perm, idx) => {
              const checkedActions = permissionMap[perm._id] || new Set();
              return (
                <div
                  key={perm._id}
                  className={`flex items-center flex-wrap gap-5 px-7 py-4 border-b border-gray-100 transition-colors ${
                    idx % 2 === 0 ? "bg-white" : "bg-teal-50/40"
                  }`}
                >
                  {/* Module Name */}
                  <div className="w-64 flex-shrink-0">
                    <span className="text-gray-800 font-semibold text-sm">
                      {perm.name}
                    </span>
                  </div>

                  {/* Action Checkboxes */}
                  <div className="flex gap-10 flex-1 flex-wrap">
                    {ACTIONS.map((action) => {
                      const isChecked = checkedActions.has(action);
                      return (
                        <label
                          key={action}
                          className="flex items-center gap-2 cursor-pointer select-none"
                        >
                          <Checkbox
                            checked={isChecked}
                            onChange={() => toggleAction(perm._id, action)}
                          />
                          <span className="text-sm text-gray-600 font-medium">
                            {action.charAt(0).toUpperCase() + action.slice(1)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Buttons ── */}
          <div className="flex justify-end gap-3 px-7 py-5 border-t border-gray-100">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 text-sm font-semibold border border-teal-500 text-teal-500 rounded-lg bg-transparent hover:bg-teal-50 transition-colors cursor-pointer"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={permissionMutation.isPending || !selectedUser}
              className="px-7 py-2 text-sm font-semibold bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              save
              {permissionMutation.isPending ? "Saving..." : "Save Permissions"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CUSTOM CHECKBOX COMPONENT
// ─────────────────────────────────────────────
function Checkbox({ checked, onChange }) {
  return (
    <div
      onClick={onChange}
      className={`w-[18px] h-[18px] rounded border-2 flex items-center justify-center cursor-pointer shrink-0 transition-all duration-150 ${
        checked
          ? "bg-teal-500 border-teal-500"
          : "bg-white border-gray-300 hover:border-teal-400"
      }`}
    >
      {checked && (
        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
          <path
            d="M1 4L4 7.5L10 1"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
