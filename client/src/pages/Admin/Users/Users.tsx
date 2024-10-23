import React from 'react';
import Leftadmincompoment from '../../../compoment/AdminCompoment/Leftadmincompoment/Leftadmincompoment';
import Right_navbarcompoment from '../../../compoment/AdminCompoment/Right_navbarcompoment/Right_navbarcompoment';
import { MdShoppingCart, MdAttachMoney, MdOutlineShoppingBag } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { usePageUser } from "../../../hook/admin/usePageUser";
import StatusCard from '../../../compoment/StatusCard';

export default function Users() {
    const { users, loading, error, handleRoleChange, handlePermissionChange } = usePageUser();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container-fluid">
            <div className="row">
                <aside className="col-md-2">
                    <Leftadmincompoment />
                </aside>
                <main className="col-md-10">
                    <Right_navbarcompoment />
                    <div className="row mt-4">
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <StatusCard icon={<MdShoppingCart />} count={users.length.toString()} title="Total Users" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <StatusCard icon={<MdAttachMoney />} count="$2,632" title="Total Income" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <StatusCard icon={<FaUserFriends />} count="1,711" title="Total Orders" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <StatusCard icon={<MdOutlineShoppingBag />} count="2,001" title="Daily Visits" />
                        </div>
                    </div>
                    <div className="table-responsive mt-4">
                        <table className="table table-bordered table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>Purchased Package</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        <td>{user.username}</td>
                                        <td>
                                            <select 
                                                className="form-control" 
                                                value={user.roles} 
                                                onChange={(e) => handleRoleChange(e, index)}
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                value="VIP1"
                                                checked={user.permissions.includes('VIP1')}
                                                onChange={(e) => handlePermissionChange(e, index, 'VIP1')}
                                            /> VIP1
                                            <input
                                                type="checkbox"
                                                value="VIP2"
                                                checked={user.permissions.includes('VIP2')}
                                                onChange={(e) => handlePermissionChange(e, index, 'VIP2')}
                                            /> VIP2
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}