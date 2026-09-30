import { SlashIcon } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { Link } from 'react-router';
import { Fragment } from 'react';

interface Breadcrumb {
    label: string;
    to: string;
}

interface Props {
    currentPage: string;
    breadcrumbs?: Breadcrumb[];
}

export const CustomBreadcrumbs = ({ currentPage, breadcrumbs = [] }: Props) => {
    return (
        <Breadcrumb className="my-5">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        render={<Link to="/">Inicio</Link>}
                    >
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {breadcrumbs.map((crumb) => (
                    <Fragment key={crumb.to}>
                        <BreadcrumbSeparator>
                            <SlashIcon />
                        </BreadcrumbSeparator>

                        <BreadcrumbItem>
                            <BreadcrumbLink
                                render={
                                    <Link to={crumb.to}>
                                        {crumb.label}
                                    </Link>
                                }
                            />
                        </BreadcrumbItem>
                    </Fragment>
                ))}

                <BreadcrumbSeparator>
                    <SlashIcon />
                </BreadcrumbSeparator>

                <BreadcrumbItem>
                    <BreadcrumbLink className="text-black">{currentPage}</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};