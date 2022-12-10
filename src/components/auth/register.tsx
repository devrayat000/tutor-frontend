import { MultiSelect, type MultiSelectProps } from "@mantine/core";
import useSWR from "swr";

import getLocations from "../../services/location";
import getSubjects from "../../services/subjects";

export const SubjectSelect = (props: Omit<MultiSelectProps, "data">) => {
  const { data: subjects } = useSWR("subjects", getSubjects, {
    suspense: true,
    fallback: {},
  });

  return (
    <MultiSelect
      data={
        subjects?.data.attributes?.subjects?.map((subject) => subject.entry) ??
        []
      }
      {...props}
    />
  );
};

export const LocationSelect = (props: Omit<MultiSelectProps, "data">) => {
  const { data: locations } = useSWR("locations", getLocations, {
    suspense: true,
    fallback: {},
  });

  return (
    <MultiSelect
      data={
        locations?.data.attributes?.locations?.map(
          (location) => location.entry
        ) ?? []
      }
      {...props}
    />
  );
};
