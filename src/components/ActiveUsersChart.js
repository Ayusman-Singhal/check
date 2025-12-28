import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import './ActiveUsersChart.css';

const ActiveUsersChart = () => {
  const data = [
    { name: 'Oct', value: 20 },
    { name: 'Mar', value: 25 },
    { name: 'Jul', value: 35 },
    { name: 'Aug', value: 50 },
  ];

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Active Users right now</h3>
        <span className="chart-icon">💡</span>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={data}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
              domain={[0, 60]}
              ticks={[0, 20, 40, 60]}
            />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(0,0,0,0.8)', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#f4d03f" 
              strokeWidth={2}
              dot={{ fill: '#f4d03f', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: '#f4d03f' }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="chart-badge">
          <span>50</span>
        </div>
      </div>
    </div>
  );
};

export default ActiveUsersChart;
