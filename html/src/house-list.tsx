import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { requestData } from './request';

type House = {
  id?: number;
  name: string;
  datetime: string;
  total_size: number;
  width: number;
  height: number;
  location: number;
  price: number;
  privacy: number;
  house_type: number;
  parking: number;
};

const columns = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '总分', dataIndex: 'total', key: 'total' },
  { title: '总面积', dataIndex: 'total_size', key: 'total_size' },
  { title: '宽度', dataIndex: 'width', key: 'width' },
  { title: '高度', dataIndex: 'height', key: 'height' },
  { title: '位置', dataIndex: 'location', key: 'location' },
  { title: '价格', dataIndex: 'price', key: 'price' },
  { title: '隐私', dataIndex: 'privacy', key: 'privacy' },
  { title: '房屋类型', dataIndex: 'house_type', key: 'house_type' },
  { title: '停车位', dataIndex: 'parking', key: 'parking' },
];

const HouseList: React.FC = () => {
  const [data, setData] = useState<House[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await requestData('getHouseList', {});
        setData(res || []);
      } catch (e) {
        setData([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey={(record: House) => record.id || record.name}
      bordered
    />
  );
};

export default HouseList; 