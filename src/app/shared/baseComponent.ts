import { inject } from "@angular/core";
import { CommonUtilities } from "./commonUtilities";

export class BaseComponent {
    // This class can be extended by other components to share common functionality
    // For example, you can add methods that are used across multiple components
    utility = inject(CommonUtilities)
}