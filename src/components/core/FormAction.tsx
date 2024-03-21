interface FormActionProps {
    type?: 'Button' | 'Link' | string;
    action?: 'submit' | 'button' | string;
    text: string;
}
const FormAction: React.FC<FormActionProps> = ({
    
    type = 'Button',
    action = type === 'Button' ? 'submit' : 'button',
    text
}) => {
    return (
        <>
        { type === 'Button' ? (
            <button 
                type='submit'
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                
            >
                {text}
            </button>) : (
            <></>
            ) } 
        </>
    )
}

export default  FormAction