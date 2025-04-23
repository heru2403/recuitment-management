export interface Employee {
  id?: number;
  nik?: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: 'Active' | 'Terminated' | 'On Leave';
  joinDate: string;
  photo?: string;
  phone?: string;
  address?: string;
  notes?: string;
}