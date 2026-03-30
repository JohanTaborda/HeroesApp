import { Link } from "react-router"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "../ui/breadcrumb"

interface BreadCrumb{
    label: string,
    to: string
}

interface CustomBreadcrumbsProps{
    currentPage: string
    breadCrumbs?: BreadCrumb[]
}


const CustomBreadcrumbs = ({currentPage, breadCrumbs = []}: CustomBreadcrumbsProps) => {


    return (
        <Breadcrumb className="my-5">
            <BreadcrumbList>
                <BreadcrumbItem >
                    <BreadcrumbLink asChild>
                        <Link to={'/'}>Inicio</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem> 

                <BreadcrumbSeparator />

                {
                    breadCrumbs.map((v,i) => (
                        <>
                            <BreadcrumbItem key={i}>
                                <BreadcrumbLink asChild>
                                    <Link to={v.to}>{v.label}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>   
                            <BreadcrumbSeparator />
                        </>
                    ))
                }

                <BreadcrumbItem>
                    <BreadcrumbPage className="text-black">{currentPage}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default CustomBreadcrumbs
