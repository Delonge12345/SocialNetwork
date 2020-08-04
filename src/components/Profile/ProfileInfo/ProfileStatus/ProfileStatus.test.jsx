import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state!)", () => {
        const component = create(<ProfileStatus status="statusFake" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("statusFake");
    });


    test("after creeation span with c should be displayed!)", () => {
        const component = create(<ProfileStatus status="statusFake" />);
        const root = component.root;
        const span = root.findByType("span");
        expect(span).not.toBeNull();
    });
});

    test("input should be displayed in editMode instead of span", () => {
    const component = create(<ProfileStatus status="statusFake" />);
    const root = component.root;
    const span = root.findByType("span");
    span.props.onDoubleClick();
    let input = root.findByType("input");
    expect(input.props.value).toBe("statusFake");
});
