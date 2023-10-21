import { Vector3 } from "./vector3.js";
import { Matrix4x4 } from "./matrix4x4.js";


export class Transform
{
	position = new Vector3(0, 0, 0);
	rotation = new Vector3(0, 0, 0);
	scale = new Vector3(1, 1, 1);

	copyFrom(transform) 
	{
		this.position.copyFrom(transform.position);
		this.rotation.copyFrom(transform.rotation);
		this.scale.copyFrom(transform.scale);
	}

	getTransformationMatrix(rotationOrder = "XYZ") 
	{
		const translation = Matrix4x4.translation(this.position);
		const rotation = Matrix4x4.rotation(this.rotation, rotationOrder);
		const scale = Matrix4x4.scale(this.scale);

		return translation.multiply(rotation).multiply(scale);
	}

	getInvertedTransformationMatrix(rotationOrder = "XYZ") 
	{
		const translation = Matrix4x4.translation(this.position);
		const rotation = Matrix4x4.rotation(this.rotation, rotationOrder);
		const scale = Matrix4x4.scale(this.scale);

		return rotation.multiply(translation).multiply(scale);
	}

	static fromMatrix(matrix) 
	{
		const t = new Transform();
		t.position = matrix.getTranslation();
		t.rotation = matrix.getRotation();
		t.scale = matrix.getScaling();
		return t;
	}
}