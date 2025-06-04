import { ColumnDef } from '@tanstack/react-table'
import { User } from '../types'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'nombres',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombres' />
    ),
  },
  {
    accessorKey: 'apellidos',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Apellidos' />
    ),
  },
  {
    accessorKey: 'correo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Correo' />
    ),
  },
  {
    accessorKey: 'celular',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Celular' />
    ),
  },
  {
    accessorKey: 'rol_nombre',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Rol' />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
