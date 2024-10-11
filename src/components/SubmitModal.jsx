import { Modal, Button } from "react-bootstrap";
export default function SubmitModal(props) {
	return (
		<Modal
			{...props}
			size="md"
			aria-labelledby="vertical-center-modal"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="vertical-center-modal">{props.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>{props.body}</p>
			</Modal.Body>
			<Modal.Footer>
				<Button className="rounded" variant="dark" onClick={props.onSubmit}>
					{props.button_text}
				</Button>
				<Button className="rounded" variant="light" onClick={props.onHide}>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
