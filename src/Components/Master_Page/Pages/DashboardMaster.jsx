// import React  , {useMemo} from 'react'
// import { MdPublishedWithChanges, MdPendingActions } from 'react-icons/md';
// import { AiOutlineDollarCircle } from 'react-icons/ai';
// import { TbCurrencyRupee } from 'react-icons/tb'; 

// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell
// } from 'recharts';

// import { motion } from 'framer-motion';

// function DashboardMaster() {

//   const data = [
//   { month: 'Jan', recovery: 12000 },
//   { month: 'Feb', recovery: 18000 },
//   { month: 'Mar', recovery: 10000 },
//   { month: 'Apr', recovery: 15000 },
//   { month: 'May', recovery: 20000 },
//   { month: 'Jun', recovery: 17000 },
//   { month: 'Jul', recovery: 22000 },
//   { month: 'Aug', recovery: 14000 },
//   { month: 'Sep', recovery: 19000 },
//   { month: 'Oct', recovery: 21000 },
//   { month: 'Nov', recovery: 16000 },
//   { month: 'Dec', recovery: 23000 }
// ];

// const colors = useMemo(()=>[
//        '#FF6B6B', '#6BCB77', '#4D96FF', '#FFB84C', '#9D4EDD', '#00B4D8',
//   '#F4A261', '#90E0EF', '#3A86FF', '#F94144', '#F3722C', '#43AA8B'
// ],[]);


//  const Card = [
//   { id: '1', cardname: "Recovery" , data : '2340' , Icons : MdPublishedWithChanges ,size:40 , color : 'bg-blue-400' , bgcolor : 'bg-green-400'},
//   { id: '2', cardname: "Total Amount"  ,data : '23300', Icons : AiOutlineDollarCircle ,size:40 , color : 'bg-yellow-500' , bgcolor : 'bg-gray-400'},
//   { id: '3', cardname: "  Pending" ,data : '2992' , Icons : MdPendingActions  , size:40  , color:'bg-gray-400' , bgcolor : 'bg-red-400'},
//   { id: '4', cardname: " Rest Amount" ,data : '29332' , Icons : TbCurrencyRupee  , size : 40 , color: 'bg-red-400', bgcolor : 'bg-pink-400'}
// ];
  

//   return (
//     <div className='overflow-y-auto h-screen '>
//                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
//         {Card.map(({ id, cardname ,data , Icons ,size , color , bgcolor }) => (
//           <div
//             key={id}
//             className={`p-4 text-black  rounded-lg shadow hover:shadow-md transition text-centeritem-center ${bgcolor}`}
//           >
//               <div className='flex justify-evenly space-x-5 '>
//                     <div className={`flex items-center justify-center w-12 h-12 rounded-full ${color}`} >
//   <Icons size={24} />
// </div>

                     
//                       <span className=' text-xl font-medium'>{data}</span>
//                      <span className='text-xl font-medium'>{cardname}</span>
//               </div>
//           </div>
//         ))}
//            </div> 
  
//            <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 1 }}
//       className="p-6 bg-white rounded-2xl shadow-xl w-full mx-auto mt-10"
//     >
//       <h2 className="text-2xl font-bold mb-4 text-center">Monthly Recovery Report</h2>
//       <ResponsiveContainer width="100%" height={400}>
//         <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" tick={{ fontSize: 14 }} />
//           <YAxis tick={{ fontSize: 14 }} />
//           <Tooltip />
//           <Legend />
//           <Bar
//             dataKey="recovery"
//             fill="#8884d8"
//             radius={[10, 10, 0, 0]}
//             label={{ position: 'top', fill: '#333' }}
//           >
//             {
//               data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
//               ))
//             }
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//            </motion.div>
           
              
           
//     </div>
//   )
// }

// export default DashboardMaster
















import React, { useMemo } from 'react';
import { MdPublishedWithChanges, MdPendingActions } from 'react-icons/md';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { TbCurrencyRupee } from 'react-icons/tb';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell
} from 'recharts';

import { motion } from 'framer-motion';

function DashboardMaster({theme}) {
  // Define a cohesive color palette
  const colors = {
    primaryBlue: '#4A90E2',
    accentGreen: '#50E3C2',
    accentYellow: '#F5A623',
    accentRed: '#D0021B',
    lightGray: '#F4F7F6',
    darkText: '#333333',
    cardBackgroundLight: '#FFFFFF', // White background for cards
    cardBorderBlue: '#C9DCEC', // Lighter blue for card border/shadow hint
    cardBorderGreen: '#CCEBDD', // Lighter green for card border/shadow hint
    cardBorderYellow: '#FCE7CB', // Lighter yellow for card border/shadow hint
    cardBorderRed: '#F8CDCF', // Lighter red for card border/shadow hint
  };

  const data = [
    { month: 'Jan', recovery: 12000 },
    { month: 'Feb', recovery: 18000 },
    { month: 'Mar', recovery: 10000 },
    { month: 'Apr', recovery: 15000 },
    { month: 'May', recovery: 20000 },
    { month: 'Jun', recovery: 17000 },
    { month: 'Jul', recovery: 22000 },
    { month: 'Aug', recovery: 14000 },
    { month: 'Sep', recovery: 19000 },
    { month: 'Oct', recovery: 21000 },
    { month: 'Nov', recovery: 16000 },
    { month: 'Dec', recovery: 23000 }
  ];

  // More harmonious colors for the bar chart cells, perhaps based on a primary hue
  const barChartColors = useMemo(() => [
    colors.primaryBlue, // A consistent primary color
    // If you need variation, use shades or analogous colors from your palette:
    '#6CB2E8', '#8CCBF0', '#ADD4F6', '#CDE0FB', // Shades of blue
    // Or you can stick to a single color if the individual monthly color isn't meaningful
  ], [colors.primaryBlue]); // Dependency to re-memoize if primaryBlue changes

  const CardData = [ // Renamed to avoid conflict with the component
    { id: '1', cardname: "Recovery", data: '2340', Icons: MdPublishedWithChanges, iconColor: colors.accentGreen, borderColor: colors.cardBorderGreen },
    { id: '2', cardname: "Total Amount", data: '23300', Icons: AiOutlineDollarCircle, iconColor: colors.accentYellow, borderColor: colors.cardBorderYellow },
    { id: '3', cardname: "Pending", data: '2992', Icons: MdPendingActions, iconColor: colors.accentRed, borderColor: colors.cardBorderRed },
    { id: '4', cardname: "Rest Amount", data: '29332', Icons: TbCurrencyRupee, iconColor: colors.primaryBlue, borderColor: colors.cardBorderBlue }
  ];

  return (
    <div className={`overflow-y-auto h-screen p-6 bg-gray-100 ${theme}`}> {/* Added padding and a light gray background */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-10"> {/* Increased gap and added bottom margin */}
        {CardData.map(({ id, cardname, data, Icons, iconColor, borderColor }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: id * 0.1 }}
            className={`p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border-b-4 ${borderColor}`} // Subtler shadow, white background, and bottom border color
          >
            <div className='flex items-center justify-between'> {/* Better alignment for content */}
              <div className={`flex items-center justify-center w-14 h-14 rounded-full bg-opacity-20`} style={{ backgroundColor: `${iconColor}20` }}> {/* Lighter background for icon circle */}
                <Icons size={28} style={{ color: iconColor }} /> {/* Icon color from palette */}
              </div>
              <div className='text-right'>
                <span className='block text-3xl font-bold text-gray-800'>{data}</span> {/* Larger, bolder data */}
                <span className='block text-md font-medium text-gray-600 mt-1'>{cardname}</span> {/* Slightly smaller card name */}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="p-6 bg-white rounded-2xl shadow-xl w-full mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Monthly Recovery Report</h2> {/* Stronger heading */}
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" /> {/* Lighter grid lines */}
            <XAxis dataKey="month" tick={{ fontSize: 13, fill: colors.darkText }} />
            <YAxis tick={{ fontSize: 13, fill: colors.darkText }} />
            <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar
              dataKey="recovery"
              fill={colors.primaryBlue} // Default fill for all bars if not using individual colors
              radius={[8, 8, 0, 0]} // Slightly smaller radius
              label={{ position: 'top', fill: colors.darkText, fontSize: 12 }}
            >
              {
                data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={barChartColors[index % barChartColors.length]} />
                ))
              }
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

export default DashboardMaster;