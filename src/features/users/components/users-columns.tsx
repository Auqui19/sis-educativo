import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export interface User {
  id: number
  nombres: string
  apellidos: string
  documento_identidad: string
  celular: string
  correo: string
  sexo: string
  fecha_nacimiento: string
  edad: number
  estado_civil: string
  grado_instruccion: string
  direccion: string
  distrito: string
  provincia: string
  departamento: string
  rol_id: number
  fecha_registro: string
  estado: number
  rol_nombre: string
}

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Seleccionar todo'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Seleccionar fila'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'documento_identidad',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='DNI' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.getValue('documento_identidad')}</div>
    ),
  },
  {
    id: 'nombres_completos',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombres Completos' />
    ),
    cell: ({ row }) => {
      const nombreCompleto = `${row.original.nombres} ${row.original.apellidos}`
      return <LongText className='max-w-[200px]'>{nombreCompleto}</LongText>
    },
  },
  {
    accessorKey: 'correo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Correo' />
    ),
    cell: ({ row }) => (
      <div className='min-w-[200px]'>{row.getValue('correo')}</div>
    ),
  },
  {
    accessorKey: 'celular',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Celular' />
    ),
    cell: ({ row }) => <div>{row.getValue('celular')}</div>,
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'rol_nombre',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Rol' />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant='outline' className='capitalize'>
          {row.getValue('rol_nombre')}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
