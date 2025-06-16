// import React from 'react';
// import { motion } from 'framer-motion';
// import { FiShoppingCart, FiPackage, FiUsers, FiDollarSign, FiMoreVertical, FiArrowUp, FiArrowDown } from 'react-icons/fi';

// // --- MOCK DATA ---
// // Data that would typically come from an API

// const overviewData = {
//     totalSales: { value: '$1,250,345', change: '+12.5%' },
//     totalOrders: { value: '8,765', change: '+8.2%' },
//     newCustomers: { value: '1,203', change: '+2.1%' },
//     revenue: { value: '$890,123', change: '-1.5%' },
// };

// const productsData = [
//     { id: 'PROD-001', name: 'Quantum Laptop Pro', category: 'Electronics', stock: 120, price: '$2499.99' },
//     { id: 'PROD-002', name: 'Acoustic Wave Headphones', category: 'Audio', stock: 350, price: '$199.99' },
//     { id: 'PROD-003', name: 'Ergo-Comfort Mouse', category: 'Peripherals', stock: 750, price: '$79.99' },
//     { id: 'PROD-004', name: '4K Ultra-Wide Monitor', category: 'Displays', stock: 85, price: '$899.00' },
// ];

// const ordersData = [
//     { id: 'ORD-1024', customer: 'John Doe', date: '2024-06-10', total: '$2499.99', status: 'Shipped' },
//     { id: 'ORD-1023', customer: 'Jane Smith', date: '2024-06-09', total: '$279.98', status: 'Processing' },
//     { id: 'ORD-1022', customer: 'Alex Johnson', date: '2024-06-09', total: '$899.00', status: 'Delivered' },
//     { id: 'ORD-1021', customer: 'Emily White', date: '2024-06-08', total: '$199.99', status: 'Delivered' },
// ];

// const customersData = [
//     { id: 'CUST-001', name: 'John Doe', email: 'john.doe@example.com', lifetimeValue: '$12,450' },
//     { id: 'CUST-002', name: 'Jane Smith', email: 'jane.smith@example.com', lifetimeValue: '$8,750' },
//     { id: 'CUST-003', name: 'Alex Johnson', email: 'alex.j@example.com', lifetimeValue: '$22,100' },
// ];

// // --- Animation Variants ---
// const sectionVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
// };

// const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
// };


// // --- Reusable UI Components ---

// const Header = () => (
//     <header className="p-6">
//         <h1 className="text-4xl font-bold text-white">Master Dashboard</h1>
//         <p className="text-lg text-gray-400">A unified view of your key business metrics.</p>
//     </header>
// );

// const OverviewCard = ({ title, data, icon, color }) => {
//     const isPositive = data.change.startsWith('+');
//     return (
//         <motion.div className="glass-container p-6 rounded-2xl" variants={itemVariants}>
//             <div className="flex items-center justify-between">
//                 <p className="text-sm text-gray-400">{title}</p>
//                 <div className={`text-2xl ${color}`}>{icon}</div>
//             </div>
//             <p className="text-3xl font-bold text-white mt-2">{data.value}</p>
//             <div className={`flex items-center text-sm mt-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
//                 {isPositive ? <FiArrowUp className="mr-1"/> : <FiArrowDown className="mr-1"/>}
//                 {data.change} vs last month
//             </div>
//         </motion.div>
//     );
// };

// // --- Dashboard Section Components ---

// const OverviewSection = () => (
//     <motion.section
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.2 }}
//         variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
//     >
//         <OverviewCard title="Total Sales" data={overviewData.totalSales} icon={<FiDollarSign />} color="text-blue-400" />
//         <OverviewCard title="Total Orders" data={overviewData.totalOrders} icon={<FiShoppingCart />} color="text-indigo-400" />
//         <OverviewCard title="New Customers" data={overviewData.newCustomers} icon={<FiUsers />} color="text-green-400" />
//         <OverviewCard title="Revenue" data={overviewData.revenue} icon={<FiPackage />} color="text-amber-400" />
//     </motion.section>
// );

// const SectionContainer = ({ title, children }) => (
//     <motion.div
//         className="glass-container p-6 rounded-2xl mt-8"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.2 }}
//         variants={sectionVariants}
//     >
//         <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
//         {children}
//     </motion.div>
// );

// const TableRow = ({ children }) => (
//     <motion.tr
//         className="border-b border-gray-700 hover:bg-gray-800/50"
//         whileHover={{ scale: 1.02 }}
//         transition={{ type: 'spring', stiffness: 300 }}
//     >
//         {children}
//     </motion.tr>
// );

// const ProductsSection = () => (
//     <SectionContainer title="Product Management">
//         <div className="overflow-x-auto">
//             <table className="w-full text-left text-gray-300">
//                 <thead>
//                     <tr className="border-b border-gray-600">
//                         <th className="p-4">Product ID</th>
//                         <th className="p-4">Name</th>
//                         <th className="p-4">Stock</th>
//                         <th className="p-4">Price</th>
//                         <th className="p-4"></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {productsData.map(p => (
//                         <TableRow key={p.id}>
//                             <td className="p-4 font-mono text-sm">{p.id}</td>
//                             <td className="p-4 font-semibold text-white">{p.name}</td>
//                             <td className="p-4">{p.stock}</td>
//                             <td className="p-4">{p.price}</td>
//                             <td className="p-4 text-center"><button className="text-gray-400 hover:text-white"><FiMoreVertical /></button></td>
//                         </TableRow>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     </SectionContainer>
// );

// const StatusBadge = ({ status }) => {
//     const statusClasses = {
//         Shipped: 'bg-blue-500/20 text-blue-300',
//         Processing: 'bg-amber-500/20 text-amber-300',
//         Delivered: 'bg-green-500/20 text-green-300',
//     };
//     return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[status]}`}>{status}</span>;
// }

// const OrdersSection = () => (
//     <SectionContainer title="Recent Orders">
//         <div className="overflow-x-auto">
//              <table className="w-full text-left text-gray-300">
//                 <thead>
//                     <tr className="border-b border-gray-600">
//                         <th className="p-4">Order ID</th>
//                         <th className="p-4">Customer</th>
//                         <th className="p-4">Date</th>
//                         <th className="p-4">Total</th>
//                         <th className="p-4">Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {ordersData.map(o => (
//                          <TableRow key={o.id}>
//                             <td className="p-4 font-mono text-sm">{o.id}</td>
//                             <td className="p-4 font-semibold text-white">{o.customer}</td>
//                             <td className="p-4">{o.date}</td>
//                             <td className="p-4">{o.total}</td>
//                             <td className="p-4"><StatusBadge status={o.status} /></td>
//                         </TableRow>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     </SectionContainer>
// );


// const CustomersSection = () => (
//     <SectionContainer title="Top Customers">
//         <div className="space-y-4">
//             {customersData.map(c => (
//                 <motion.div
//                     key={c.id}
//                     className="flex items-center justify-between bg-gray-800/40 p-4 rounded-lg"
//                     variants={itemVariants}
//                 >
//                     <div className="flex items-center">
//                         <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white mr-4">
//                             {c.name.charAt(0)}
//                         </div>
//                         <div>
//                             <p className="font-semibold text-white">{c.name}</p>
//                             <p className="text-sm text-gray-400">{c.email}</p>
//                         </div>
//                     </div>
//                     <div>
//                         <p className="text-sm text-gray-400">Lifetime Value</p>
//                         <p className="font-bold text-white text-right">{c.lifetimeValue}</p>
//                     </div>
//                 </motion.div>
//             ))}
//         </div>
//     </SectionContainer>
// );

// // --- Main Dashboard Component ---

// const SinglePageDashboard = () => {
//     return (
//         <div className="min-h-screen bg-[#0e0e0f] text-white p-4 sm:p-6 lg:p-8">
//             <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
//                 <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full opacity-10 blur-3xl"></div>
//                 <div className="absolute bottom-0 -right-40 w-96 h-96 bg-gradient-to-tl from-indigo-500 to-indigo-700 rounded-full opacity-10 blur-3xl"></div>
//             </div>

//             <div className="relative z-10 max-w-7xl mx-auto">
//                 <Header />
//                 <main>
//                      <OverviewSection />
//                     <ProductsSection />
//                     <OrdersSection />
//                     <CustomersSection /> 
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default Master_DashBoard;





import React from 'react'

function Master_DashBoard() {
  return (
    <div>Master_DashBoard</div>
  )
}

export default Master_DashBoard