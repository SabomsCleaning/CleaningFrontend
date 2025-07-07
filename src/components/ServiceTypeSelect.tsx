'use client';

import { useEffect, useState } from 'react';
import { ServiceType } from '../../lib/api/serviceTypes';

type Props = {
  onSelect: (selected: ServiceType | null) => void;
};

export default function ServiceTypeSelect({ onSelect }: Props) {
  const [items, setItems] = useState<ServiceType[]>([]);
  const [selectedId, setSelectedId] = useState<number | ''>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/serviceTypes');
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error('Fel vid hämtning:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    setSelectedId(id);
    const selected = items.find((item) => item.id === id) ?? null;
    onSelect(selected);
  };

  return (
    <div className="space-y-2">
      <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
        Tjänstetyp
      </label>
      <select
        id="serviceType"
        value={selectedId}
        onChange={handleChange}
        className="border rounded p-2"
      >
        <option value="">-- Välj en tjänst --</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
