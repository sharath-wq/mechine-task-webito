import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TableData = () => {
    return (
        <div className='w-full h-[880px] flex justify-center pt-24 bg-blue-50 '>
            <div className='w-2/3'>
                <Table>
                    <TableCaption>Transactions</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-[100px]'>Username</TableHead>
                            <TableHead>User Plan Amount</TableHead>
                            <TableHead>User Plan Date</TableHead>
                            <TableHead className='text-right'>User Plan Last Date</TableHead>
                            <TableHead className='text-right'>Total Balance</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className='font-medium'>INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell className='text-right'>$250.00</TableCell>
                            <TableCell className='text-right'>$250.00</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default TableData;
