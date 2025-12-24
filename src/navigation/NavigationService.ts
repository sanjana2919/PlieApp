import {
    CommonActions,
    StackActions,
} from '@react-navigation/native';
import { Navigate, TopLevelNavigation } from './NavigationServiceProps';

let _navigator: any;
let _onStateChangeCallback: (screenName: string) => void;

let setTopLevelNavigator: TopLevelNavigation = function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

let navigate: Navigate = function navigate(routeName, params) {
    _navigator.navigate(routeName, params);
}

function findRouteWithKey(state: any, key: string): any | null {
    if (!state || !state.routes) return null;

    for (let route of state.routes) {
        if (route.key === key) {
            return { parentState: state, route };
        }

        if (route.state) {
            const found = findRouteWithKey(route.state, key);
            if (found) return found;
        }
    }

    return null;
}

function canPopToTop() {
    if (!_navigator) {
        console.log('[NavigationService] ❌ _navigator is undefined');
        return false;
    }

    const currentRoute = _navigator.getCurrentRoute();
    const currentKey = currentRoute?.key;

    console.log('[NavigationService] currentRoute:', currentRoute);

    const rootState = _navigator.getRootState();
    console.log('[NavigationService] rootState:', rootState);

    const found = findRouteWithKey(rootState, currentKey);
    console.log('[NavigationService] found matching route:', found);

    if (found && found.parentState?.routes?.length > 1) {
        console.log('[NavigationService] ✅ canPopToTop = true');
        return true;
    }

    console.log('[NavigationService] ❌ canPopToTop = false');
    return false;
}


function canGoBack() {
    return _navigator?.canGoBack?.() ?? false;
}

function pop(count: number = 1) {
    _navigator.dispatch(StackActions.pop(count));
}

function popToTop() {
    console.log('[NavigationService] Attempting popToTop');

    if (canPopToTop()) {
        console.log('[NavigationService] ✅ Dispatching StackActions.popToTop()');
        _navigator.dispatch(StackActions.popToTop());
    } else {
        console.log('[NavigationService] ❌ Cannot popToTop (stack has only one route)');
    }
}

function push(routeName: any, params: any) {
    _navigator.dispatch(StackActions.push(routeName, params));
}

let replace: Navigate = function replace(routeName, params) {
    console.log('[NavigationService] Current route:', getCurrentRoute())
    const currentScreen = getCurrentRoute();
    _navigator.dispatch(StackActions.replace(routeName, params));
}

function reset() {
    _navigator.dispatch(
        CommonActions.reset({
            index: 1,
            routes: [{ name: 'Home' }],
        }),
    );
}

function setParams(routeKey: string, params: object) {
    _navigator.dispatch(
        CommonActions.setParams(params)
    );
}

function getCurrentRoute() {
    return _navigator.getCurrentRoute()?.name ?? '';
}

// Add listener for state changes
function setOnStateChangeCallback(callback: (screenName: string) => void) {
    _onStateChangeCallback = callback;
}

// Function to notify the current screen on navigation state changes
function onStateChange() {
    const currentRoute = getCurrentRoute();
    if (_onStateChangeCallback) {
        _onStateChangeCallback(currentRoute); // Notify the callback
    }
}

function getCurrentStack(): string[] {
    if (!_navigator) {
        console.log('[NavigationService] ❌ _navigator is undefined');
        return [];
    }

    const state = _navigator.getRootState();
    const stack: string[] = [];

    function traverseRoutes(navState: any) {
        if (navState.routes) {
            navState.routes.forEach((route: any) => {
                if (route.name) {
                    stack.push(route.name);
                }
                if (route.state) {
                    traverseRoutes(route.state);
                }
            });
        }
    }

    traverseRoutes(state);
    return stack;
}

function getNavigationTree(): string {
    if (!_navigator) return "Navigator not initialized";

    const state = _navigator.getRootState();
    if (!state) return "No navigation state";

    let treeString = "\n🌳 NAVIGATION TREE 🌳\n====================\n";

    function traverse(navState: any, level = 0, isLast: boolean[] = []): string {
        if (!navState) return "";

        const routes = navState.routes || [];
        let branchString = "";

        routes.forEach((route: any, index: number) => {
            const isLastRoute = index === routes.length - 1;
            const newIsLast = [...isLast, isLastRoute];

            // Build tree structure
            let treePrefix = "";
            if (level > 0) {
                treePrefix = isLast.slice(0, -1).map(l => (l ? "    " : "│   ")).join("");
                treePrefix += isLast[isLast.length - 1] ? "└── " : "├── ";
            }

            // Add route info
            branchString += `${treePrefix}${route.name}\n`;

            // Add params if they exist
            if (route.params && Object.keys(route.params).length > 0) {
                const paramPrefix = isLastRoute ? "    " : "│   ";
                const paramIndent = " ".repeat(treePrefix.length) + paramPrefix;
                branchString += `${paramIndent}└─ params: ${JSON.stringify(route.params)}\n`;
            }

            // Recursively add nested state
            if (route.state) {
                branchString += traverse(route.state, level + 1, newIsLast);
            }
        });

        return branchString;
    }

    treeString += traverse(state);
    treeString += "====================";
    return treeString;
}

export default {
    navigate,
    setTopLevelNavigator,
    popToTop,
    pop,
    reset,
    getCurrentRoute,
    replace,
    push,
    setOnStateChangeCallback,
    onStateChange,
    canGoBack,
    setParams,
    getCurrentStack,
    getNavigationTree,
};
