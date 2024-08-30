// import React, { Suspense, ComponentType } from "react";

// interface LazyProps {
//     component: ComponentType<any>;
//     fallback?: React.ReactNode;
// }

// const Lazy: React.FC<LazyProps> = ({
//     component: Component,
//     fallback = <div>Loading...</div>,
// }) => {
//     return (
//         <Suspense fallback={fallback}>
//             <Component />
//         </Suspense>
//     );
// };

// export default Lazy;

// // Helper function to create lazy components
// export function createLazyComponent<T extends ComponentType<any>>(
//     loader: () => Promise<{ default: T }>
// ) {
//     const LazyComponent = (props: any) => {
//         const [Component, setComponent] = React.useState<T | null>(null);

//         React.useEffect(() => {
//             loader().then((module) => setComponent(() => module.default));
//         }, []);

//         if (!Component) return null;

//         return <Component {...props} />;
//     };

//     return LazyComponent;
// }
