import { ChevronLeft, ChevronRight } from 'lucide-react'
import  { Button } from '../ui/button'
import { useSearchParams } from 'react-router'

interface CustomPaginationProps{
    totalPages: number
}

const CustomPagination = ({totalPages}: CustomPaginationProps) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const page = searchParams.get('page') ?? '1';


    return (
        <div className="flex items-center justify-center space-x-2">
            <Button variant="outline" size="sm" 
                disabled={+page === 1}
                onClick={() => setSearchParams((prev) => {
                    prev.set('page', String(+page - 1))

                    return prev;
                })}
            >
                <ChevronLeft className="h-4 w-4" />
                Anterior
            </Button>
            {
                Array.from({length: totalPages}).map((_, index) => (
                    <Button 
                        key={index}
                        variant={
                            +page === index + 1 ? "default" : "outline"
                        } 
                        size="sm"
                        onClick={() => setSearchParams((prev) => {
                            prev.set('page', String(index + 1))

                            return prev;
                        })}
                    >
                        {index + 1}
                    </Button>
                ))
            }
{/* 
            <Button variant="ghost" size="sm" disabled>
                <MoreHorizontal className="h-4 w-4" />
            </Button> */}

            <Button variant="outline" size="sm" 
                disabled={+page === totalPages}
                onClick={() => setSearchParams((prev) => {
                    prev.set('page', String(+page + 1))

                    return prev;
                })}
            >
                Siguiente
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default CustomPagination
