import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

const Server: React.FC = () => {
  const { commonStore } = useStore();
  return (
    <Container>
      <Header as="h1" content="Server Error" />
      <Header sub as="h5" color="red" content={commonStore.error?.message} />
      {commonStore.error?.details ? (
        <Segment>
          <Header as="h4" content="Stack Trace" color="teal" />
          <code style={{ marginTop: 10 }}>{commonStore.error?.details}</code>
        </Segment>
      ) : null}
    </Container>
  );
};

export default Server;
