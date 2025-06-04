import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { User } from '../types'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'documento_identidad',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='DNI' />
    ),
  },
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
    accessorKey: 'estado',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Estado' />
    ),
    cell: ({ row }) => {
      const estado = row.getValue('estado') as number
      return (
        <Badge variant={estado === 1 ? 'default' : 'destructive'}>
          {estado === 1 ? 'Activo' : 'Inactivo'}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
