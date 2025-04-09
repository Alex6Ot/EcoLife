"use client";

import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Receipt, 
  ArrowUpRight, 
  ArrowDownLeft,
  Calendar,
  Filter,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

const transactions = [
  {
    id: 1,
    type: 'Earned',
    amount: '+50 ECB',
    date: 'Mar 1, 2025',
    time: '2:30 PM',
    status: 'Completado',
    description: 'Recompensa por Reciclaje'
  },
  {
    id: 2,
    type: 'Redeemed',
    amount: '-20 ECB',
    date: 'Feb 29, 2025',
    time: '4:15 PM',
    status: 'Completedo',
    description: 'Transferencia'
  },
  {
    id: 3,
    type: 'Earned',
    amount: '+30 ECB',
    date: 'Feb 28, 2025',
    time: '1:45 PM',
    status: 'Completado',
    description: 'Recompensa por Reciclaje'
  },
  {
    id: 4,
    type: 'Earned',
    amount: '+45 ECB',
    date: 'Feb 27, 2025',
    time: '11:20 AM',
    status: 'Completado',
    description: 'Recompensa por Reciclaje'
  },
  {
    id: 5,
    type: 'Redeemed',
    amount: '-20 ECB',
    date: 'Feb 26, 2025',
    time: '3:00 PM',
    status: 'Completado',
    description: 'Mercado Pago'
  },
  {
    id: 6,
    type: 'Redeemed',
    amount: '-15 ECB',
    date: 'Feb 26, 2025',
    time: '3:00 PM',
    status: 'Pendiente',
    description: 'Uber Trip'
  }

];

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Receipt className="h-8 w-8 text-emerald-600" />
          Transacciones
        </h1>
        <p className="text-muted-foreground">
        Realice un seguimiento de la actividad y el historial de sus tokens EcoBits
        </p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar transacciones..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Transactions List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-4 glass-card hover-scale">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'Earned' 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30' 
                      : 'bg-red-100 text-red-600 dark:bg-red-900/30'
                  }`}>
                    {transaction.type === 'Earned' ? (
                      <ArrowUpRight className="h-5 w-5" />
                    ) : (
                      <ArrowDownLeft className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{transaction.date}</span>
                      <span>•</span>
                      <span>{transaction.time}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'Earned' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.status}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}