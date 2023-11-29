import ReactLoading from 'react-loading';

interface LoadingProps {

    color: string
}
 
export const Loading = ({ color }: LoadingProps) => (
    <ReactLoading type='spin' color={color} height={30} width={30} />
);
 

